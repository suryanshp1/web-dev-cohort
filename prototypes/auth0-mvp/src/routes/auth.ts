import { Router } from 'express';
import { z } from 'zod';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword, verifyPassword } from '../services/crypto';
import { createSession, destroySession } from '../services/session';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirm: z.string().min(8),
}).refine(data => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});

router.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    
    const existing = await db.select().from(users).where(eq(users.email, data.email));
    if (existing.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const passwordHash = await hashPassword(data.password);
    
    await db.insert(users).values({
      email: data.email,
      passwordHash,
    });

    res.redirect('/login.html?registered=true');
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password, continue_uri } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

    const result = await db.select().from(users).where(eq(users.email, email));
    if (result.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    
    const user = result[0];
    const isValid = await verifyPassword(user.passwordHash, password);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const sessionId = await createSession(user.id);
    
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    if (continue_uri) {
      res.redirect(continue_uri);
    } else {
      res.redirect('/admin.html'); // Just a default fallback
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/logout', async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await destroySession(sessionId);
    res.clearCookie('sessionId');
  }
  res.redirect('/login.html');
});

export default router;
