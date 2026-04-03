from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
)

response = client.chat.completions.create(
    model="gemini-3-flash-preview",
    messages=[
        {   "role": "system",
            "content": """You are an expert in math and only and only answer maths related questions.
            If query is not related to math, just say sorry and do not answer that"""
        },
        {
            "role": "user",
            "content": "hey help me to solve (a+b)^2"
        }
    ]
)

print(response.choices[0].message.content)