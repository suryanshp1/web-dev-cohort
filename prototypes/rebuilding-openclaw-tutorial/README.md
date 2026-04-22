# Rebuilding OpenClaw from Scratch

Source code for the **Rebuilding OpenClaw from Scratch** YouTube series.

Each part builds on the last. Start with Part 1 and work forward.

---

## The Series

| Part | Topic | Status |
|------|-------|--------|
| [Part 1](./part-1) | The Agent Loop | ✅ Available |
| [Part 2](./part-2) | Personality: Soul + Identity | ✅ Available |
| [Part 3](./part-3) | Telegram Integration | ✅ Available |
| [Part 4](./part-4) | Heartbeat + Cron | ✅ Available |

---

## Part 1 — The Agent Loop

A minimal CLI agent. Type a message, the agent calls an LLM, runs tools if needed, and loops until it has a response.

### What's built

- `agent/loop.py` — the core agent loop
- `tools/filesystem.py` — read and write files
- `tools/exec.py` — run shell commands
- `session/manager.py` — persists conversation history to `~/.ai-assistant/sessions/`
- `main.py` — interactive CLI and single-shot mode

### Requirements

- Python 3.13+
- An [OpenRouter](https://openrouter.ai) API key

### Setup

```bash
cd part-1
pip install -r requirements.txt
export OPENROUTER_API_KEY=your_key_here
```

### Run

**Interactive mode:**
```bash
python3 main.py
```

**Single-shot mode:**
```bash
python3 main.py "what files are in the current directory"
python3 main.py "write hello world to /tmp/test.txt then read it back"
```

### How it works

1. Your message is sent to the LLM (Claude via OpenRouter)
2. If the LLM wants to call a tool, the agent executes it and feeds the result back
3. This loops until the LLM returns a plain text response
4. The full conversation is saved to `~/.ai-assistant/sessions/cli:default.jsonl`

---

## Part 2 — Personality: Soul + Identity

Adds personality, memory, and a first-boot bootstrap flow. The agent introduces itself, asks who you are, and writes its own soul file.

### What's added

- `agent/memory.py` — seeds the workspace, reads all files into the system prompt
- `agent/context.py` — wraps workspace files in tagged sections and builds the system prompt
- `workspace-templates/` — five markdown files: SOUL, USER, MEMORY, AGENTS, BOOTSTRAP

### How it works

On first launch, `BOOTSTRAP.md` is injected into the system prompt. The agent asks three questions, writes `SOUL.md` and `USER.md`, then deletes itself. Every subsequent session loads the workspace files automatically.

### Run

```bash
cd part-2
pip install -r requirements.txt
export OPENROUTER_API_KEY=your_key_here
python3 main.py
```

---

## Part 3 — Telegram Integration

Adds a Telegram bot as the first real communication channel. The agent now runs as a persistent gateway, receiving and responding to messages over Telegram instead of the CLI.

### What's added

- `channels/telegram.py` — `TelegramAdapter`: starts the bot, filters messages to an allow-list, queues incoming messages, sends chunked replies
- `config/schema.py` — Pydantic config loaded from `~/.ai-assistant/config.json`; prints setup instructions and exits if no token is set
- `gateway.py` — async message loop: receives a Telegram message, runs the agent, saves the session, sends the response back
- `session/manager.py` — fix: timestamps are now per-message instead of shared across a batch
- `tools/exec.py` — commands now run in `~/.ai-assistant/workspace` by default

### Requirements

- Python 3.13+
- An [OpenRouter](https://openrouter.ai) API key
- A Telegram bot token (from [@BotFather](https://t.me/BotFather))

### Setup

```bash
cd part-3
pip install -r requirements.txt
export OPENROUTER_API_KEY=your_key_here
python3 gateway.py  # prints config instructions on first run
```

Edit `~/.ai-assistant/config.json` with your bot token and Telegram user ID, then run again.

### Run

```bash
python3 gateway.py
```

The gateway runs until Ctrl+C. Send your bot a message on Telegram and it responds.

---

## Part 4 — Heartbeat + Cron

Makes the agent proactive. It wakes up on a schedule, checks a checklist, and messages you without being asked. Users can also schedule future tasks via natural language.

### What's added

- `cron/service.py` — `CronService` ticks every 10s and fires jobs when due; supports one-shot (`in:5m`), recurring (`interval:3600`), and cron expressions (`0 9 * * *`)
- `tools/cron.py` — `CronAddTool`, `CronListTool`, `CronRemoveTool` so the LLM can manage schedules
- `workspace-templates/HEARTBEAT.md` — instructions the agent runs on each heartbeat tick
- `config/schema.py` — heartbeat config: `enabled`, `interval`, `active_hours_start/end`, `chat_id`
- `gateway.py` — adds `_heartbeat_loop` and `_cron_task`; all three message sources (Telegram, heartbeat, cron) funnel through the same inbound queue

### How it works

A heartbeat loop wakes up every N minutes, reads `HEARTBEAT.md`, and injects it as an automated message. The agent checks conditions and either acts or returns `HEARTBEAT_OK` to drop the message silently. Cron jobs work the same way — the LLM schedules them, and when they fire they're treated like any other inbound message.

### Setup

```bash
cd part-4
pip install -r requirements.txt
export OPENROUTER_API_KEY=your_key_here
```

Add to `~/.ai-assistant/config.json`:

```json
{
  "telegram": {
    "bot_token": "YOUR_BOT_TOKEN",
    "allow_from": ["YOUR_TELEGRAM_USER_ID"]
  },
  "heartbeat": {
    "enabled": true,
    "interval": "30m",
    "active_hours_start": "07:00",
    "active_hours_end": "22:00",
    "channel": "telegram",
    "chat_id": "YOUR_TELEGRAM_USER_ID"
  }
}
```

### Run

```bash
python3 gateway.py
```

---

## What is OpenClaw?

[OpenClaw](https://github.com/openclaw) is a self-hosted, always-on personal AI assistant with tools, memory, Telegram integration, and proactive heartbeat behavior. This series rebuilds it from scratch so you can understand exactly how it works.
