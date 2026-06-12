import { Router } from 'express';
import { db } from '../db';
import { users, oauthClients } from '../db/schema';
import crypto from 'crypto';

const router = Router();

// MVP Admin Routes - in a real app these would be protected by a session or admin role middleware

router.get('/users', async (req, res) => {
  try {
    const allUsers = await db.select({
      id: users.id,
      email: users.email,
      createdAt: users.createdAt,
    }).from(users);
    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ error: 'server_error' });
  }
});

router.get('/clients', async (req, res) => {
  try {
    const clients = await db.select({
      id: oauthClients.id,
      clientId: oauthClients.clientId,
      name: oauthClients.name,
      redirectUris: oauthClients.redirectUris,
      createdAt: oauthClients.createdAt,
    }).from(oauthClients);
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: 'server_error' });
  }
});

router.post('/clients', async (req, res) => {
  try {
    const { name, redirectUris } = req.body;
    
    if (!name || !Array.isArray(redirectUris)) {
      return res.status(400).json({ error: 'invalid_request' });
    }

    const clientId = crypto.randomBytes(16).toString('hex');
    const clientSecret = crypto.randomBytes(32).toString('hex');

    const [newClient] = await db.insert(oauthClients).values({
      name,
      clientId,
      clientSecret,
      redirectUris,
    }).returning();

    res.json(newClient);
  } catch (err) {
    res.status(500).json({ error: 'server_error' });
  }
});

export default router;
