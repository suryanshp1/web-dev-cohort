# Part 2 — Personality: Soul + Identity

Builds on Part 1. Adds personality, memory, and a first-boot bootstrap flow to the agent.

## What's added

- `agent/memory.py` — seeds the workspace on first boot, reads all files into the system prompt
- `agent/context.py` — builds the system prompt by wrapping workspace files in tagged sections
- `workspace-templates/SOUL.md` — who the agent is (rewritten by the agent during bootstrap)
- `workspace-templates/USER.md` — who you are: name, timezone, projects, preferences
- `workspace-templates/MEMORY.md` — persistent notes across sessions
- `workspace-templates/AGENTS.md` — operational rules: tools, memory, format
- `workspace-templates/BOOTSTRAP.md` — first-boot setup instructions (deleted after first run)

## How it works

On first launch, `BOOTSTRAP.md` is present in the workspace and gets injected into the system prompt. On the user's first message, the agent runs the bootstrap flow — asks three questions, writes `SOUL.md` and `USER.md`, then deletes `BOOTSTRAP.md`.

Every subsequent launch, the workspace files are read and injected into the system prompt as tagged blocks. The agent has personality, knows who you are, and remembers things across sessions.

## Setup

```bash
cd part-2
pip install -r requirements.txt
export OPENROUTER_API_KEY=your_key_here
```

## Run

```bash
python3 main.py
```

On first run the agent will introduce itself and ask you three questions. After that it's ready to use.
