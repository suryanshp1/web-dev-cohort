# Part 4 — Heartbeat + Cron

Builds on Part 3. Makes the agent proactive — it wakes up on a schedule, checks a checklist, and messages you without being asked. Users can also schedule future tasks via natural language.

## What's added

- `cron/service.py` — `CronService` that ticks every 10 seconds and fires jobs when due
- `tools/cron.py` — `CronAddTool`, `CronListTool`, `CronRemoveTool` for the LLM to manage schedules
- `workspace-templates/HEARTBEAT.md` — instructions the agent runs on each heartbeat tick
- `config/schema.py` — heartbeat config: `enabled`, `interval`, `active_hours_start/end`, `chat_id`
- `gateway.py` — adds `_heartbeat_loop` and `_cron_task`, wires them into the shared inbound queue

## How it works

**Heartbeat** — a background loop wakes up every N minutes (configurable), reads `HEARTBEAT.md` from the workspace, and injects it as an automated message. The agent checks conditions (time of day, weather, etc.) and either acts or responds with `HEARTBEAT_OK` to suppress output silently.

**Cron** — a `CronService` runs alongside the message loop. The LLM can schedule jobs using `cron_add` with:
- `in:5m` — one-shot, fires once after 5 minutes
- `interval:3600` — recurring every hour
- `0 9 * * *` — standard cron expression

All three (messages, heartbeat, cron) funnel through the same inbound queue and are handled by the same `_message_loop`.

## Setup

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

## Run

```bash
python3 gateway.py
```

The agent will respond to Telegram messages as before, plus wake up on the heartbeat schedule and fire any cron jobs you've scheduled.
