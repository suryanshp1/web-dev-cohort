import { Router } from 'express';
import { z } from 'zod';
import { db } from '../db';
import { oauthClients, authorizationCodes, users } from '../db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import { signJwt } from '../services/jwt';
import { getSession } from '../services/session';

const router = Router();

router.get('/authorize', async (req, res) => {
  try {
    const { client_id, redirect_uri, response_type, scope, state, nonce } = req.query;

    if (!client_id || !redirect_uri || response_type !== 'code') {
      return res.status(400).send('Invalid request parameters');
    }

    // Verify client
    const clients = await db.select().from(oauthClients).where(eq(oauthClients.clientId, String(client_id)));
    if (clients.length === 0) return res.status(400).send('Invalid client_id');
    const client = clients[0];

    // Verify redirect_uri
    const allowedUris = client.redirectUris as string[];
    if (!allowedUris.includes(String(redirect_uri))) {
      return res.status(400).send('Invalid redirect_uri');
    }

    // Check session
    const sessionId = req.cookies.sessionId;
    let session = sessionId ? await getSession(sessionId) : null;

    if (!session) {
      // Need to login, construct a continue URL
      const continueUri = req.originalUrl;
      return res.redirect(`/login.html?continue_uri=${encodeURIComponent(continueUri)}`);
    }

    // Generate authorization code
    const code = crypto.randomBytes(16).toString('hex');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await db.insert(authorizationCodes).values({
      code,
      clientId: client.id,
      userId: session.userId,
      scope: String(scope || 'openid'),
      redirectUri: String(redirect_uri),
      nonce: nonce ? String(nonce) : null,
      expiresAt,
    });

    // Redirect back to client
    let redirectUrl = `${redirect_uri}?code=${code}`;
    if (state) {
      redirectUrl += `&state=${encodeURIComponent(String(state))}`;
    }

    res.redirect(redirectUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

router.post('/token', async (req, res) => {
  try {
    // Usually sent via Basic Auth header or body
    const { grant_type, code, client_id, client_secret, redirect_uri } = req.body;

    if (grant_type !== 'authorization_code' || !code || !client_id) {
      return res.status(400).json({ error: 'invalid_request' });
    }

    // Verify client
    const clients = await db.select().from(oauthClients).where(eq(oauthClients.clientId, String(client_id)));
    if (clients.length === 0) return res.status(401).json({ error: 'invalid_client' });
    const client = clients[0];

    // Verify secret if provided (for confidential clients)
    if (client_secret && client.clientSecret !== client_secret) {
      return res.status(401).json({ error: 'invalid_client' });
    }

    // Verify authorization code
    const codes = await db.select().from(authorizationCodes).where(eq(authorizationCodes.code, code));
    if (codes.length === 0) return res.status(400).json({ error: 'invalid_grant' });
    const authCode = codes[0];

    // Ensure single use
    await db.delete(authorizationCodes).where(eq(authorizationCodes.id, authCode.id));

    if (authCode.clientId !== client.id) return res.status(400).json({ error: 'invalid_grant' });
    if (new Date() > authCode.expiresAt) return res.status(400).json({ error: 'invalid_grant' });
    if (authCode.redirectUri !== redirect_uri) return res.status(400).json({ error: 'invalid_grant' });

    // Fetch user for claims
    const userRecords = await db.select().from(users).where(eq(users.id, authCode.userId));
    if (userRecords.length === 0) return res.status(400).json({ error: 'invalid_grant' });
    const user = userRecords[0];

    // Generate Access Token
    const accessToken = await signJwt({
      sub: user.id,
      aud: client.clientId,
      scope: authCode.scope || 'openid',
    });

    // Generate ID Token
    const idTokenPayload: any = {
      sub: user.id,
      aud: client.clientId,
      email: user.email,
    };
    if (authCode.nonce) idTokenPayload.nonce = authCode.nonce;
    const idToken = await signJwt(idTokenPayload);

    res.json({
      access_token: accessToken,
      id_token: idToken,
      expires_in: 3600,
      token_type: 'Bearer'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server_error' });
  }
});

router.get('/userinfo', async (req, res) => {
  // We'll trust the access token here (normally we'd verify it, but MVP can be simple or we can add a middleware)
  // For a basic MVP without robust token introspection middleware:
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'invalid_token' });
  }
  
  const token = authHeader.split(' ')[1];
  try {
    import * as jose from 'jose';
    import { getActiveKey } from '../services/jwt';
    const key = await getActiveKey();
    const publicKey = await jose.importSPKI(key.publicKey, 'RS256');
    const { payload } = await jose.jwtVerify(token, publicKey);

    const userRecords = await db.select().from(users).where(eq(users.id, payload.sub as string));
    if (userRecords.length === 0) return res.status(401).json({ error: 'invalid_token' });
    const user = userRecords[0];

    res.json({
      sub: user.id,
      email: user.email,
    });
  } catch (err) {
    return res.status(401).json({ error: 'invalid_token' });
  }
});

export default router;
