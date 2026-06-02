import express from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis';
import cors from 'cors';
import passport from 'passport';
import { createServer } from 'http';
import dotenv from 'dotenv';
import { redis } from './redis';
import { setupWebSockets } from './socket';
import { configureAuth } from './auth';
import { apiRouter } from './routes/api';

dotenv.config({ path: '../.env' });

const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const app = express();
const server = createServer(app);

const sessionParser = session({
  store: new RedisStore({ client: redis as any }),
  secret: process.env.SESSION_SECRET || 'super-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
});

// Middleware
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(sessionParser);
app.use(passport.initialize());
app.use(passport.session());

// Auth
configureAuth();

// API Routes
app.use('/', apiRouter);

// Sockets
setupWebSockets(server, sessionParser);

server.listen(PORT, () => {
  console.log(`[Server] Listening on port ${PORT}`);
});
