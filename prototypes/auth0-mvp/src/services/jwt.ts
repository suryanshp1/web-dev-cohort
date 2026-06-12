import * as crypto from 'crypto';
import { db } from '../db';
import { signingKeys } from '../db/schema';
import { eq } from 'drizzle-orm';
import * as jose from 'jose';

export async function getActiveKey() {
  const keys = await db.select().from(signingKeys).where(eq(signingKeys.active, true)).limit(1);
  if (keys.length > 0) {
    return keys[0];
  }
  
  // Generate a new key pair
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });

  const kid = crypto.randomUUID();

  const [newKey] = await db.insert(signingKeys).values({
    kid,
    privateKey,
    publicKey,
    active: true,
  }).returning();

  return newKey;
}

export async function getJwks() {
  const keys = await db.select().from(signingKeys).where(eq(signingKeys.active, true));
  const jwks = await Promise.all(keys.map(async (k) => {
    const publicKeyObj = await jose.importSPKI(k.publicKey, 'RS256');
    const jwk = await jose.exportJWK(publicKeyObj);
    return {
      ...jwk,
      kid: k.kid,
      use: 'sig',
      alg: 'RS256'
    };
  }));
  return { keys: jwks };
}

export async function signJwt(payload: jose.JWTPayload, expiresIn: string | number = '1h') {
  const keyRecord = await getActiveKey();
  const privateKey = await jose.importPKCS8(keyRecord.privateKey, 'RS256');
  
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'RS256', kid: keyRecord.kid })
    .setIssuedAt()
    .setIssuer(process.env.ISSUER || 'http://localhost:3000')
    .setExpirationTime(expiresIn)
    .sign(privateKey);
}
