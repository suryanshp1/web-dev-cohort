import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export function configureAuth() {
  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj: any, done) => {
    done(null, obj);
  });

  const clientID = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  
  if (clientID && clientSecret && clientID !== 'your_github_client_id') {
    passport.use(
      new GitHubStrategy(
        {
          clientID,
          clientSecret,
          callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback',
        },
        function (accessToken: string, refreshToken: string, profile: any, done: any) {
          // You could save the user to a database here. 
          // For this MVP, we just pass the profile into the session.
          return done(null, {
            id: profile.id,
            username: profile.username,
            displayName: profile.displayName,
          });
        }
      )
    );
  } else {
    console.warn("GitHub OAuth variables not set or default. Real auth is disabled. Mock auth will be used if configured.");
  }
}
