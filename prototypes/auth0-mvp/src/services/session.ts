import { db } from '../db';
import { sessions } from '../db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

export async function createSession(userId: string): Promise<string> {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 1); // 1 day session

  const [session] = await db.insert(sessions).values({
    userId,
    expiresAt,
  }).returning();

  return session.id;
}

export async function getSession(sessionId: string) {
  const result = await db.select().from(sessions).where(eq(sessions.id, sessionId));
  if (result.length === 0) return null;
  const session = result[0];
  if (session.expiresAt < new Date()) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    return null;
  }
  return session;
}

export async function destroySession(sessionId: string) {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}
