import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { redis, redisPub, redisSub } from './redis';
import { rateLimit, LIMITS } from './ratelimit';
import { Request } from 'express';

interface AuthenticatedWebSocket extends WebSocket {
  user?: any;
  socketId: string;
}

export function setupWebSockets(server: Server, sessionParser: any) {
  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (request: Request, socket, head) => {
    sessionParser(request, {} as any, () => {
      // Create a fake req object for passport to use if needed
      // but session is usually enough
      const session = (request as any).session;
      const user = session?.passport?.user;

      wss.handleUpgrade(request, socket, head, (ws) => {
        const authWs = ws as AuthenticatedWebSocket;
        authWs.socketId = Math.random().toString(36).substring(7);
        if (user) {
          authWs.user = user;
        }
        wss.emit('connection', authWs, request);
      });
    });
  });

  wss.on('connection', (ws: AuthenticatedWebSocket) => {
    // console.log(`[Socket] Connected: ${ws.socketId}, User: ${ws.user?.username || 'anonymous'}`);

    ws.on('message', async (message: string) => {
      try {
        const data = JSON.parse(message);

        if (data.action === 'toggle') {
          // 1. Authenticate Write Actions
          if (!ws.user) {
            ws.send(JSON.stringify({ type: 'auth:required', message: 'You must be logged in to toggle checkboxes.' }));
            return;
          }

          // 2. Validate payload
          const checkboxId = parseInt(data.checkboxId, 10);
          if (isNaN(checkboxId) || checkboxId < 0 || checkboxId >= 1000000) {
            return;
          }

          // 3. Rate Limit (Burst per Socket)
          const socketBurstAllowed = await rateLimit(`ratelimit:socket:${ws.socketId}`, LIMITS.SOCKET_BURST.limit, LIMITS.SOCKET_BURST.window);
          if (!socketBurstAllowed) {
            ws.send(JSON.stringify({ type: 'rate_limit:blocked', message: 'Too many requests. Slow down.' }));
            return;
          }

          // 4. Rate Limit (User Toggle Quota)
          const userToggleAllowed = await rateLimit(`ratelimit:user:${ws.user.id}`, LIMITS.USER_TOGGLE.limit, LIMITS.USER_TOGGLE.window);
          if (!userToggleAllowed) {
            ws.send(JSON.stringify({ type: 'rate_limit:blocked', message: 'User rate limit exceeded.' }));
            return;
          }

          // 5. Atomic State Update in Redis (Bitfield)
          // We use GETBIT first to flip it, or client can pass intended state.
          // Let's rely on client intent to avoid race conditions overriding each other badly, 
          // or we can just flip whatever is there. The PRD suggests sending desired new state or intent.
          // Let's assume action="toggle" sends "val" (0 or 1)
          const val = data.val === 1 ? 1 : 0;
          
          await redis.setbit('checkbox_state', checkboxId, val);

          // 6. Publish Event for all instances
          const updatePayload = { id: checkboxId, val, u: ws.user.username };
          await redisPub.publish('checkbox_updates', JSON.stringify(updatePayload));
        }

      } catch (err) {
        console.error('Socket message error', err);
      }
    });

    ws.on('close', () => {
      // console.log(`[Socket] Disconnected: ${ws.socketId}`);
    });
  });

  // Subscribe to Redis Pub/Sub to broadcast to all connected clients
  redisSub.subscribe('checkbox_updates', (err, count) => {
    if (err) console.error("Failed to subscribe: %s", err.message);
  });

  redisSub.on('message', (channel, message) => {
    if (channel === 'checkbox_updates') {
      const parsed = JSON.parse(message);
      const broadcastData = JSON.stringify({
        type: 'checkbox:updated',
        ...parsed
      });

      // Broadcast to all local clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(broadcastData);
        }
      });
    }
  });

  return wss;
}
