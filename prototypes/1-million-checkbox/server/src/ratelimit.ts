import { redis } from './redis';

/**
 * Custom Fixed-Window Rate Limiter using Redis.
 * 
 * @param key Unique identifier for the rate limit (e.g. "ratelimit:ip:127.0.0.1")
 * @param limit Max number of requests allowed in the window
 * @param windowSeconds Time window in seconds
 * @returns boolean - True if allowed, false if blocked
 */
export async function rateLimit(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  // Use a simple INCR + EXPIRE strategy
  // If the key doesn't exist, INCR sets it to 1
  const current = await redis.incr(key);
  
  if (current === 1) {
    // First request in this window, set the expiry
    await redis.expire(key, windowSeconds);
  }

  // If we exceed the limit, return false
  if (current > limit) {
    return false;
  }

  return true;
}

export const LIMITS = {
  // Anonymous IP limit for API routes
  IP_HTTP: { limit: 100, window: 60 },
  
  // Authenticated user limit for toggles over socket
  USER_TOGGLE: { limit: 50, window: 5 },
  
  // Socket ID limit for burst control (preventing a script from just blasting via single socket)
  SOCKET_BURST: { limit: 20, window: 1 },
  
  // Reconnects per socket IP
  RECONNECT: { limit: 10, window: 10 },
};
