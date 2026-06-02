import { Router } from 'express';
import { redis } from '../redis';
import passport from 'passport';

export const apiRouter = Router();

// --- Auth Routes ---
apiRouter.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

apiRouter.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.redirect(process.env.CLIENT_URL || 'http://localhost:5173');
  }
);

apiRouter.post('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.json({ message: 'Logged out' });
  });
});

apiRouter.get('/api/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

// --- Grid Data Routes ---
apiRouter.get('/api/grid', async (req, res) => {
  try {
    // Fetch the entire bitfield from Redis
    const buffer = await redis.getBuffer('checkbox_state');
    
    // If no buffer, send back an empty array buffer
    if (!buffer) {
      const emptyArray = new Uint8Array(125000); // 1,000,000 bits = 125,000 bytes
      res.set('Content-Type', 'application/octet-stream');
      return res.send(Buffer.from(emptyArray));
    }

    // Set header and send raw binary data
    res.set('Content-Type', 'application/octet-stream');
    res.send(buffer);
  } catch (error) {
    console.error('Failed to fetch grid state:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

apiRouter.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
