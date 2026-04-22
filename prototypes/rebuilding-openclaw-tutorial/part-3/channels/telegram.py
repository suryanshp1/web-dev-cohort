import asyncio
import logging

from telegram import Update
from telegram.ext import Application, ContextTypes, MessageHandler, filters

logger = logging.getLogger(__name__)

TELEGRAM_MAX_LENGTH = 4096


class TelegramAdapter:
    def __init__(self, bot_token: str, allow_from: list[str]):
        self._allow_from = set(str(u) for u in allow_from)

        # FIFO buffer between Telegram's delivery thread and our async loop
        self._queue: asyncio.Queue = asyncio.Queue()

        self._app = Application.builder().token(bot_token).build()

        # Only handle plain text messages — ignore photos, stickers, /commands, etc.
        self._app.add_handler(
            MessageHandler(filters.TEXT & ~filters.COMMAND, self._on_message)
        )

    async def _on_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        sender_id = str(update.effective_user.id)

        # Security gate — ignore anyone not in the allow-list
        if self._allow_from and sender_id not in self._allow_from:
            logger.warning("Ignored message from unauthorized user %s", sender_id)
            return

        await self._queue.put({
            "chat_id": str(update.effective_chat.id),
            "sender_id": sender_id,
            "text": update.message.text,
        })

    async def messages(self):
        # async generator — suspends until the next message arrives, then yields it
        while True:
            yield await self._queue.get()

    async def send(self, chat_id: str, text: str):
        # Telegram rejects messages over 4096 chars, so split into chunks
        while text:
            chunk, text = text[:TELEGRAM_MAX_LENGTH], text[TELEGRAM_MAX_LENGTH:]
            await self._app.bot.send_message(chat_id=chat_id, text=chunk)

    async def start(self):
        await self._app.initialize()
        await self._app.start()
        await self._app.updater.start_polling()

    async def stop(self):
        await self._app.updater.stop()
        await self._app.stop()
        await self._app.shutdown()
