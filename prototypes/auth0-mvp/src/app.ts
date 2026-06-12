import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth';
import oauthRoutes from './routes/oauth';
import oidcRoutes from './routes/oidc';
import adminRoutes from './routes/admin';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static views and assets
app.use(express.static(path.join(__dirname, 'views')));

app.use('/auth', authRoutes);
app.use('/oauth', oauthRoutes);
app.use('/.well-known', oidcRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Auth0 MVP server listening on port ${PORT}`);
});
