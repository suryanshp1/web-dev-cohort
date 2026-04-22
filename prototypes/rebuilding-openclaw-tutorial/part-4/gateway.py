import asyncio
import os
import signal
from datetime import datetime, time, timezone
from pathlib import Path

import litellm
from rich.console import Console

from agent.context import build_system_prompt
from agent.loop import run_agent
from agent.memory import MemoryManager
from channels.telegram import TelegramAdapter
from config.schema import AppConfig, load_config
from cron.service import CronService
from session.manager import SessionManager
from tools.cron import CronAddTool, CronListTool, CronRemoveTool
console = Console()

from tools.exec import ExecTool
from tools.filesystem import ReadFileTool, WriteFileTool


async def _message_loop(queue: asyncio.Queue, adapter: TelegramAdapter, tools: list, memory: MemoryManager):
    # chat_id → message history, kept in memory so we don't reload from disk on every message
    sessions: dict[str, list] = {}

    while True:
        msg = await queue.get()

        chat_id = msg["chat_id"]
        channel = msg.get("channel", "telegram")
        sender_id = msg.get("sender_id", "")
        masked = str(chat_id)[:3] + "***"
        console.print(f"[bold cyan][{channel}:{masked}][/bold cyan] {msg['text']}")
        session = SessionManager(f"{channel}:{chat_id}")

        if chat_id not in sessions:
            sessions[chat_id] = session.load()

        history = sessions[chat_id]

        # system prompt
        system_prompt = build_system_prompt(memory, channel=channel, chat_id=chat_id)

        # frame automated messages so the agent doesn't treat them as user chat
        text = msg["text"]
        if sender_id in ("heartbeat", "cron"):
            text = f"[Automated {sender_id} — act on these instructions, do not describe them]\n\n{text}"

        # run agent
        response, new_messages = await run_agent(
            text, tools, history=history, system_prompt=system_prompt
        )

        # store new messages
        session.append(new_messages)
        history.extend(new_messages)

        # HEARTBEAT_OK protocol — heartbeat/cron messages that aren't worth surfacing are dropped silently
        if sender_id in ("heartbeat", "cron") and response.strip().startswith("HEARTBEAT_OK"):
            continue

        await adapter.send(chat_id, response)


async def _heartbeat_loop(queue: asyncio.Queue, memory: MemoryManager, config: AppConfig):
    hb = config.heartbeat

    if not hb.enabled or not hb.chat_id:
        return

    # parse interval string: "30m" → 1800, "1h" → 3600, "2h" → 7200
    unit_map = {"s": 1, "m": 60, "h": 3600}
    interval = int(hb.interval[:-1]) * unit_map[hb.interval[-1]]

    while True:
        await asyncio.sleep(interval)

        # active hours check
        now = datetime.now()
        start = time.fromisoformat(hb.active_hours_start)
        end = time.fromisoformat(hb.active_hours_end)
        if not (start <= now.time() <= end):
            continue

        # read HEARTBEAT.md from workspace
        heartbeat_path = Path(memory.workspace) / "HEARTBEAT.md"
        if not heartbeat_path.exists():
            continue
        text = heartbeat_path.read_text().strip()
        if not text:
            continue

        await queue.put({
            "channel": hb.channel,
            "chat_id": hb.chat_id,
            "sender_id": "heartbeat",
            "text": text,
        })


async def main():
    config = load_config()

    litellm.api_base = "https://openrouter.ai/api/v1"
    litellm.api_key = os.environ["OPENROUTER_API_KEY"]

    memory = MemoryManager()

    # shared queue — telegram, heartbeat, and cron all push into this
    inbound: asyncio.Queue = asyncio.Queue()

    cron = CronService(inbound)

    tools = [
        ReadFileTool(),
        WriteFileTool(),
        ExecTool(),
        CronAddTool(cron),
        CronListTool(cron),
        CronRemoveTool(cron),
    ]

    # setup and start telegram
    adapter = TelegramAdapter(
        bot_token=config.telegram.bot_token,
        allow_from=config.telegram.allow_from,
        queue=inbound,
    )
    await adapter.start()
    print("Gateway running. Press Ctrl+C to stop.")

    # register shutdown signals (Ctrl+C and kill)
    loop = asyncio.get_running_loop()
    stop_event = asyncio.Event()
    loop.add_signal_handler(signal.SIGINT, stop_event.set)   # SIGINT  = Ctrl+C
    loop.add_signal_handler(signal.SIGTERM, stop_event.set)  # SIGTERM = kill command (e.g. Docker, systemd stopping the process)

    # kick everything off
    message_task = asyncio.create_task(_message_loop(inbound, adapter, tools, memory))
    heartbeat_task = asyncio.create_task(_heartbeat_loop(inbound, memory, config))
    cron_task = asyncio.create_task(cron.run())

    # wait here until a shutdown signal arrives
    await stop_event.wait()

    print("\nShutting down...")
    message_task.cancel()
    heartbeat_task.cancel()
    cron_task.cancel()
    await adapter.stop()
    print("Done.")


if __name__ == "__main__":
    asyncio.run(main())
