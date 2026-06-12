# Basic OIDC Authentication Service MVP

A lightweight, developer-friendly OIDC Identity Provider (IdP) inspired by Auth0 and Keycloak, built for indie hackers and local development projects.

## Architecture

This project implements a typical OAuth 2.0 Authorization Code flow with OIDC ID Tokens.

```mermaid
graph TD
    Client[Browser / Client App] -->|1. GET /authorize| Auth[Auth API]
    Auth -->|2. Redirect| Login[Login UI]
    Login -->|3. Submit Credentials| Auth
    Auth -->|4. Validate User| DB[(PostgreSQL)]
    Auth -->|5. Redirect with Code| Client
    Client -->|6. POST /token| Token[Token Endpoint]
    Token -->|7. Verify Auth Code| DB
    Token -->|8. Sign JWTs| KeyGen[RSA Crypto Service]
    Token -->|9. Access & ID Token| Client
    
    subgraph "Auth0 MVP Core"
        Auth
        Token
        Login
        KeyGen
        Admin[Admin Dashboard]
        OIDC[/.well-known Endpoints]
    end
    
    Admin --> DB
    OIDC --> KeyGen
```

## Features

- **User Authentication**: Simple login, registration, and session management using HTMX and Alpine.js.
- **OIDC Compatible**: Implements `/.well-known/openid-configuration` and `/.well-known/jwks.json`.
- **OAuth2 Flow**: Support for the Authorization Code Grant.
- **Dynamic RSA Keys**: Automatic generation of RS256 keypairs for JWT signing.
- **Admin Dashboard**: Manage OAuth clients and view registered users.

## Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Security**: `jose` (JWTs & JWKS), `argon2` (Password Hashing), `zod` (Validation)
- **Frontend**: Vanilla HTML/CSS, HTMX, Alpine.js

## Getting Started

1. **Start PostgreSQL Database**
   ```bash
   docker compose up -d
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Initialize Database**
   ```bash
   npm run db:push
   ```

4. **Seed Database**
   ```bash
   npm run dev:seed
   # Note: you can run 'npx tsx scripts/seed.ts' if the script is not in package.json
   ```

5. **Start the Application**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000/login.html](http://localhost:3000/login.html) to view the application!
