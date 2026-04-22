import asyncio
import json
import os
import uuid
from dataclasses import asdict, dataclass
from datetime import datetime, timezone

CRON_PATH = os.path.expanduser("~/.ai-assistant/cron.json")


@dataclass
class CronJob:
    id: str
    schedule: str
    message: str
    channel: str
    chat_id: str
    enabled: bool = True
    next_run: str | None = None


def _next_run(schedule: str, now: datetime) -> datetime:
    """Compute the next fire time for a schedule."""
    unit_map = {"s": 1, "m": 60, "h": 3600}

    # "in:5m", "in:30s", "in:2h" — one-shot relative
    if schedule.startswith("in:"):
        spec = schedule[3:]
        secs = int(spec[:-1]) * unit_map[spec[-1]]
        return datetime.fromtimestamp(now.timestamp() + secs, tz=timezone.utc)

    # "interval:N" — recurring every N seconds
    if schedule.startswith("interval:"):
        secs = int(schedule.split(":")[1])
        return datetime.fromtimestamp(now.timestamp() + secs, tz=timezone.utc)

    # cron expression — "0 9 * * *", "*/30 * * * *", etc.
    from croniter import croniter
    return croniter(schedule, now).get_next(datetime).replace(tzinfo=timezone.utc)


class CronService:
    def __init__(self, queue: asyncio.Queue, path: str = CRON_PATH):
        self._queue = queue
        self._path = path
        self._jobs: list[CronJob] = []
        self._load()

    def _load(self):
        if not os.path.exists(self._path):
            return
        with open(self._path) as f:
            data = json.load(f)
        now = datetime.now(timezone.utc)
        for item in data:
            job = CronJob(**item)
            if job.enabled:
                job.next_run = _next_run(job.schedule, now).isoformat()
            self._jobs.append(job)

    def _save(self):
        os.makedirs(os.path.dirname(self._path), exist_ok=True)
        with open(self._path, "w") as f:
            json.dump([asdict(j) for j in self._jobs], f, indent=2)

    def add(self, schedule: str, message: str, channel: str, chat_id: str) -> CronJob:
        job = CronJob(
            id=str(uuid.uuid4()),
            schedule=schedule,
            message=message,
            channel=channel,
            chat_id=chat_id,
            next_run=_next_run(schedule, datetime.now(timezone.utc)).isoformat(),
        )
        self._jobs.append(job)
        self._save()
        return job

    def remove(self, job_id: str) -> bool:
        before = len(self._jobs)
        self._jobs = [j for j in self._jobs if j.id != job_id]
        if len(self._jobs) < before:
            self._save()
            return True
        return False

    def list_jobs(self) -> list[CronJob]:
        return list(self._jobs)

    async def run(self):
        while True:
            now = datetime.now(timezone.utc)
            for job in self._jobs:
                if not job.enabled or not job.next_run:
                    continue
                if datetime.fromisoformat(job.next_run).replace(tzinfo=timezone.utc) <= now:
                    await self._queue.put({
                        "channel": job.channel,
                        "chat_id": job.chat_id,
                        "sender_id": "cron",
                        "text": job.message,
                    })
                    if job.schedule.startswith("in:"):
                        job.enabled = False  # one-shot — done
                    else:
                        job.next_run = _next_run(job.schedule, now).isoformat()
                    self._save()
            await asyncio.sleep(10)
