import json
import os
import sys

from pydantic import BaseModel
from pydantic_settings import BaseSettings, JsonConfigSettingsSource, PydanticBaseSettingsSource, SettingsConfigDict

CONFIG_PATH = os.path.expanduser("~/.ai-assistant/config.json")

DEFAULT_CONFIG = {
    "telegram": {
        "bot_token": "",
        "allow_from": []
    }
}

SETUP_INSTRUCTIONS = """
No Telegram bot token found. To set up:

  1. Message @BotFather on Telegram → /newbot → copy your token
  2. Find your Telegram user ID: message @userinfobot
  3. Edit ~/.ai-assistant/config.json:

     {
       "telegram": {
         "bot_token": "YOUR_BOT_TOKEN",
         "allow_from": ["YOUR_TELEGRAM_USER_ID"]
       }
     }

  4. Re-run: python3 gateway.py
"""


class TelegramConfig(BaseModel):
    bot_token: str = ""
    allow_from: list[str] = []


class AppConfig(BaseSettings):
    telegram: TelegramConfig = TelegramConfig()
    model_config = SettingsConfigDict(json_file=CONFIG_PATH)

    @classmethod
    def settings_customise_sources(cls, settings_cls: type[BaseSettings], **kwargs) -> tuple[PydanticBaseSettingsSource, ...]:
        # pydantic-settings requires this explicit wiring to read from a JSON file
        return (JsonConfigSettingsSource(settings_cls),)


def load_config() -> AppConfig:
    if not os.path.exists(CONFIG_PATH):
        os.makedirs(os.path.dirname(CONFIG_PATH), exist_ok=True)
        with open(CONFIG_PATH, "w") as f:
            json.dump(DEFAULT_CONFIG, f, indent=2)
        print(f"Created default config at {CONFIG_PATH}")

    config = AppConfig()

    if not config.telegram.bot_token:
        print(SETUP_INSTRUCTIONS)
        sys.exit(1)

    return config
