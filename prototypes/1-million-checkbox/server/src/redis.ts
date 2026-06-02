import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' }); // Load from root if running locally

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Main Redis client for general operations (sessions, bitfields, rate limits)
export const redis = new Redis(REDIS_URL);

// Dedicated clients for Pub/Sub
export const redisPub = new Redis(REDIS_URL);
export const redisSub = new Redis(REDIS_URL);

redis.on('error', (err) => console.error('Redis Error:', err));
redis.on('connect', () => console.log('Redis connected successfully.'));
