import asyncio
import os
import signal

import litellm

from agent.context import build_system_prompt
from agent.loop import run_agent
from agent.memory import MemoryManager
from channels.telegram import TelegramAdapter
from config.schema import load_config
from session.manager import SessionManager
from tools.exec import ExecTool
from tools.filesystem import ReadFileTool, WriteFileTool


async def _message_loop(adapter: TelegramAdapter, tools: list, memory: MemoryManager):
    # chat_id → message history, kept in memory so we don't reload from disk on every message
    sessions: dict[str, list] = {}

    # waits for the next message, then handles it
    async for msg in adapter.messages(): 
        # Session management + loading
        chat_id = msg["chat_id"]
        session = SessionManager(f"telegram:{chat_id}")

        if chat_id not in sessions:
            sessions[chat_id] = session.load()

        history = sessions[chat_id]

        # system prompt
        system_prompt = build_system_prompt(memory, channel="telegram", chat_id=chat_id)

        # run agent
        response, new_messages = await run_agent(
            msg["text"], tools, history=history, system_prompt=system_prompt
        )

        # Store new messages
        session.append(new_messages)
        history.extend(new_messages)

        # send response
        await adapter.send(chat_id, response)


async def main():
    config = load_config()

    litellm.api_base = "https://openrouter.ai/api/v1"
    litellm.api_key = os.environ["OPENROUTER_API_KEY"]

    memory = MemoryManager()
    tools = [ReadFileTool(), WriteFileTool(), ExecTool()]

    # setup and start telegram
    adapter = TelegramAdapter(
        bot_token=config.telegram.bot_token,
        allow_from=config.telegram.allow_from,
    )
    await adapter.start()
    print("Gateway running. Press Ctrl+C to stop.")

    # Register shutdown signals (Ctrl+C and kill)
    loop = asyncio.get_running_loop()
    stop_event = asyncio.Event()
    loop.add_signal_handler(signal.SIGINT, stop_event.set)   # SIGINT  = Ctrl+C
    loop.add_signal_handler(signal.SIGTERM, stop_event.set)  # SIGTERM = kill command (e.g. Docker, systemd stopping the process)

    # kick everything off
    message_task = asyncio.create_task(_message_loop(adapter, tools, memory))

    # wait here until a shutdown signal arrives
    await stop_event.wait()

    print("\nShutting down...")
    message_task.cancel()
    await adapter.stop()
    print("Done.")


if __name__ == "__main__":
    asyncio.run(main())
