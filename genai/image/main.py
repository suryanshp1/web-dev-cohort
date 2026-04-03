from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4.1-mini",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "Generate a caption for this image in about 50 words"},
            {"type": "image_url", "image_url": {"url": "https://images.pexels.com/photos/32837459/pexels-photo-32837459.jpeg"}}
        ]
    }]
)

print(f"Image Caption response : {response.choices[0].message.content}")