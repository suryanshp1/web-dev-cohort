import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("GEMINI_API_KEY environment variable not set")

# model = "gemini-2.0-flash-001"
model = "gemini-3.1-flash-lite-preview"
client = genai.Client(api_key=api_key)

def generate_content():
    prompt = "Why is Boot.dev such a great place to learn about RAG? Use one paragraph maximum."

    response = client.models.generate_content(model=model, contents=prompt)

    return response.text