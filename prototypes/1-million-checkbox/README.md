# 1 Million Checkboxes 🚀

A real-time collaborative web application demonstrating a scalable architecture for managing an extremely large interactive state across multiple users. 

Built as a CTO-level architectural implementation proving the effectiveness of WebSockets, Redis Bitfields, and React DOM Virtualization.

## 🌟 Features
- **1,000,000 Checkboxes**: Rendered at 60 FPS using a 2D Virtualized Grid.
- **Real-time Sync**: Instantaneous updates across all connected clients via WebSockets (`ws`).
- **Extreme Efficiency**: Entire 1,000,000 grid state is stored in a single **125 KB Redis Bitfield**! No bulky JSON arrays or bloated databases.
- **Robust Security**: Built-in OAuth 2.0 (GitHub) authentication for write actions.
- **Multi-layered Rate Limiting**: Manual Redis-backed rate limiter blocking IP abuse, rapid socket bursts, and user toggle spam.
- **Pub/Sub Fanout**: Built to scale horizontally. State diffs are broadcast via Redis Pub/Sub to all server instances.

---

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, `@tanstack/react-virtual`
- **Backend**: Node.js, Express, `ws`, `passport-github2`
- **Database/Coordination**: Redis (`ioredis`)

---

## 🚀 Getting Started

### 1. Requirements
- Node.js (v18+)
- Docker (for local Redis)

### 2. Environment Setup
Copy the template and fill in your GitHub OAuth credentials if you want to test authentication.
```bash
cp .env.example .env
```

### 3. Start Redis
```bash
docker-compose up -d
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Run the Application
Start both the backend server and the frontend client simultaneously:
```bash
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

---

## 🏛 Architecture Highlights

### 1. The Redis Bitfield Strategy
Storing 1,000,000 booleans is a classic memory trap. We solve this by using Redis `SETBIT` and `GETBIT`.
- **Memory Footprint**: Exactly 125 Kilobytes.
- **Initial Load**: The frontend fetches the raw `ArrayBuffer` of the bitfield via HTTP, which loads near-instantly over modern networks, avoiding thousands of individual SQL rows.
- **Mutations**: Atomic `SETBIT` operations ensure zero race conditions when 1,000 users toggle boxes simultaneously.

### 2. Realtime Broadcast
When a user toggles a box:
1. Express validates the WebSocket session.
2. The Rate Limiter allows the request.
3. Redis updates the bitfield.
4. The server publishes to the `checkbox_updates` Redis channel.
5. All horizontally scaled Node servers receive the Pub/Sub event and push it to their local WebSocket clients.

### 3. Custom Rate Limiter
We implemented a strict fixed-window custom rate limiter directly in Redis (`INCR` + `EXPIRE`), evaluating limits at three layers:
- **Anonymous HTTP Requests**: Strict IP limits.
- **Socket Event Burst Limit**: Preventing scripts from rapidly mutating state via a single open connection.
- **Authenticated User Limits**: Capping maximum toggles per user per window.

### 4. Virtualized DOM Rendering
Rendering 1M DOM elements crashes browsers. We utilize a 2D Virtualizer to only render the ~2000 checkboxes currently visible within the user's viewport. As the user scrolls, DOM nodes are recycled instantly, ensuring smooth native performance.

---

## 🎯 Author
Built to demonstrate elite systems thinking, low-latency architectures, and production-grade WebSockets.
