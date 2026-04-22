import asyncio
import os
import sys

import litellm

from agent.context import build_system_prompt
from agent.loop import console, run_agent
from agent.memory import MemoryManager
from session.manager import SessionManager
from tools.exec import ExecTool
from tools.filesystem import ReadFileTool, WriteFileTool

litellm.api_base = "https://openrouter.ai/api/v1"
litellm.api_key = os.environ["OPENROUTER_API_KEY"]


async def main():
    memory = MemoryManager()
    session = SessionManager("cli:default")
    history = session.load()
    tools = [ReadFileTool(), WriteFileTool(), ExecTool()]

    system_prompt = build_system_prompt(memory)

    # Single-shot mode
    if len(sys.argv) > 1:
        user_message = " ".join(sys.argv[1:])
        _, new_messages = await run_agent(
            user_message, tools, history=history, system_prompt=system_prompt
        )
        session.append(new_messages)
        return

    # Interactive loop
    console.print("[bold]AI Assistant[/bold] — type [dim]exit[/dim] or [dim]quit[/dim] to stop\n")
    while True:
        try:
            console.print("[bold cyan]you[/bold cyan]", end=" ")
            user_input = input().strip()
        except (EOFError, KeyboardInterrupt):
            console.print("\n[dim]Goodbye.[/dim]")
            break

        if not user_input:
            continue
        if user_input.lower() in ("exit", "quit"):
            console.print("[dim]Goodbye.[/dim]")
            break

        _, new_messages = await run_agent(
            user_input, tools, history=history, system_prompt=system_prompt
        )
        session.append(new_messages)
        history.extend(new_messages)
        console.print()


if __name__ == "__main__":
    asyncio.run(main())
