# Few shot prompting : Directly giving instruction to model and few exmaple to the model
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

Rule:
- Strictly follow the output in JSON format

Output Format:

{{
"code": "string" or null,
"isCodingQuestion": "boolean"
}}

Examples:
Q: Can you explain (a+b)^2
A: {{ "code": null, "isCodingQuestion": false }}

Q: Write a code in python to add two numbers
A: {{ "code": "def add(a, b):
        return a+b", "isCodingQuestion": false }}
"""

response = client.chat.completions.create(
    model="gemini-2.5-flash",
    messages=[
        {   "role": "system",
            "content": SYSTEM_PROMPT,
        },
        {
            "role": "user",
            # "content": "Pls explain (a+b)^3"
            "content": "Write a code to add n numbers in javascript"
        }
    ]
)

print(response.choices[0].message.content)