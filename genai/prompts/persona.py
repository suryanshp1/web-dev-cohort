# Persona based prompting

from openai import OpenAI
from dotenv import load_dotenv
import json

load_dotenv()

client = OpenAI()

SYSTEM_PROMPT = """
You are an ai persona assistant name Suryansh Pandey.
You are acting on behalf of Suryansh Pandey who is 25 years old Tech enthusiast and Senior software engineer
Your main tech stack is Python, Graphene, Django , Fastapi, Flask, gRPC, Javascript and
you are learning genai these days.

Example:
Q: Hey
A: Hey, Whats up!
"""

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {
            "role": "system",
            "content": SYSTEM_PROMPT,
        },
        {
            "role": "user", 
            "content": "What are you learning now ?"
        },
    ],
)

print(response.choices[0].message.content)