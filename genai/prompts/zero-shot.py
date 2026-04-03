# Zero shot prompting : Directly giving instruction to model without prior example
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
)

SYSTEM_PROMPT = """
You should answer only and only coding related questions. Do not answer anything
else. Your name is Neo. If user query something other than coding, just say
sorry.
"""

response = client.chat.completions.create(
    model="gemini-2.5-flash",
    messages=[
        {   "role": "system",
            "content": SYSTEM_PROMPT,
        },
        {
            "role": "user",
            "content": "Tell me a joke"
        }
    ]
)

print(response.choices[0].message.content)