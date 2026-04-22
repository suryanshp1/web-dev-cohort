from tools.base import Tool
from cron.service import CronService


class CronAddTool(Tool):
    name = "cron_add"
    description = (
        "Schedule a future message to be injected into this conversation. "
        "Use 'in:Nm' for one-shot (e.g. 'in:5m'), 'interval:N' for recurring every N seconds, "
        "or a cron expression like '0 9 * * *'."
    )
    parameters = {
        "type": "object",
        "properties": {
            "schedule": {"type": "string", "description": "When to fire. Examples: 'in:5m', 'in:1h', 'interval:3600', '0 9 * * *'"},
            "message": {"type": "string", "description": "The message to inject when the job fires."},
            "channel": {"type": "string", "description": "Channel to send to (e.g. 'telegram')."},
            "chat_id": {"type": "string", "description": "Chat ID to send to."},
        },
        "required": ["schedule", "message", "channel", "chat_id"],
    }

    def __init__(self, cron: CronService):
        self._cron = cron

    async def execute(self, args: dict) -> str:
        job = self._cron.add(
            schedule=args["schedule"],
            message=args["message"],
            channel=args["channel"],
            chat_id=args["chat_id"],
        )
        return f"Scheduled job {job.id}: '{job.message}' (next run: {job.next_run})"


class CronListTool(Tool):
    name = "cron_list"
    description = "List all scheduled cron jobs."
    parameters = {"type": "object", "properties": {}, "required": []}

    def __init__(self, cron: CronService):
        self._cron = cron

    async def execute(self, args: dict) -> str:
        jobs = self._cron.list_jobs()
        if not jobs:
            return "No jobs scheduled."
        lines = []
        for j in jobs:
            status = "enabled" if j.enabled else "disabled"
            lines.append(f"[{j.id[:8]}] {j.schedule!r} → {j.message!r} ({status}, next: {j.next_run})")
        return "\n".join(lines)


class CronRemoveTool(Tool):
    name = "cron_remove"
    description = "Remove a scheduled cron job by ID."
    parameters = {
        "type": "object",
        "properties": {
            "job_id": {"type": "string", "description": "The job ID to remove (or first 8 chars)."},
        },
        "required": ["job_id"],
    }

    def __init__(self, cron: CronService):
        self._cron = cron

    async def execute(self, args: dict) -> str:
        job_id = args["job_id"]
        # Support short IDs (first 8 chars)
        if len(job_id) < 36:
            match = next((j.id for j in self._cron.list_jobs() if j.id.startswith(job_id)), None)
            if match:
                job_id = match
        removed = self._cron.remove(job_id)
        return f"Removed job {job_id}." if removed else f"No job found with ID {job_id}."
