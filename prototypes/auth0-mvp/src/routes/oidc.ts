import { Router } from 'express';
import { getJwks } from '../services/jwt';

const router = Router();

router.get('/openid-configuration', (req, res) => {
  const issuer = process.env.ISSUER || 'http://localhost:3000';
  
  res.json({
    issuer,
    authorization_endpoint: `${issuer}/oauth/authorize`,
    token_endpoint: `${issuer}/oauth/token`,
    userinfo_endpoint: `${issuer}/oauth/userinfo`,
    jwks_uri: `${issuer}/.well-known/jwks.json`,
    response_types_supported: ["code"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    scopes_supported: ["openid", "profile", "email"],
    token_endpoint_auth_methods_supported: ["client_secret_basic", "client_secret_post"]
  });
});

router.get('/jwks.json', async (req, res) => {
  try {
    const jwks = await getJwks();
    res.json(jwks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server_error' });
  }
});

export default router;
