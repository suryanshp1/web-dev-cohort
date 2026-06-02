type MessageHandler = (data: any) => void;

export class SocketManager {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private handlers: Map<string, MessageHandler[]> = new Map();
  private maxReconnects = 10;

  constructor(url: string) {
    this.url = url;
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log('Connected to server');
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const callbacks = this.handlers.get(data.type) || [];
        callbacks.forEach(cb => cb(data));
      } catch (err) {
        console.error('Failed to parse socket message', err);
      }
    };

    this.ws.onclose = () => {
      console.log('Socket closed. Reconnecting...');
      this.reconnect();
    };

    this.ws.onerror = (err) => {
      console.error('Socket error:', err);
    };
  }

  reconnect() {
    if (this.reconnectAttempts >= this.maxReconnects) {
      console.error('Max reconnects reached');
      return;
    }
    this.reconnectAttempts++;
    setTimeout(() => {
      this.connect();
    }, 1000 * Math.min(this.reconnectAttempts, 5)); // exponential backoff cap
  }

  on(type: string, handler: MessageHandler) {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, []);
    }
    this.handlers.get(type)!.push(handler);
  }

  off(type: string, handler: MessageHandler) {
    const callbacks = this.handlers.get(type);
    if (callbacks) {
      this.handlers.set(type, callbacks.filter(cb => cb !== handler));
    }
  }

  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn('Cannot send, socket not open');
    }
  }

  toggle(checkboxId: number, val: number) {
    this.send({ action: 'toggle', checkboxId, val });
  }
}

export const socketManager = new SocketManager('ws://localhost:3000');
