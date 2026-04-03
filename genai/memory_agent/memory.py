from mem0 import Memory
from dotenv import load_dotenv
from openai import OpenAI
import json
import os

load_dotenv()

OPENAI_API_KEY=os.getenv("OPENAI_API_KEY")
NEO4J_USERNAME=os.getenv("NEO4J_USERNAME")
NEO4J_PASSWORD=os.getenv("NEO4J_PASSWORD")
NEO4J_CONNECTION_URI=os.getenv("NEO4J_CONNECTION_URI")


client = OpenAI()

config = {
    "version": "v1.1",
    "embedder": {
        "provider": "openai",
        "config": {
            "api_key": OPENAI_API_KEY,
            "model": "text-embedding-3-small"
        }
    },
    "llm": {
        "provider": "openai",
        "config": {
            "api_key": OPENAI_API_KEY,
            "model": "gpt-4.1"
        }
    },
    "graph_store": {
        "provider": "neo4j",
        "config": {
            "url": NEO4J_CONNECTION_URI,
            "username": NEO4J_USERNAME,
            "password": NEO4J_PASSWORD,
        }
    },
    "vector_store": {
        "provider": "qdrant",
        "config": {
            "host": "localhost",
            "port": 6333
        }
    }
}

mem_client = Memory.from_config(config)

while True:
    user_query = input("USER > ")

    search_memory = mem_client.search(query=user_query, user_id="suryansh")

    memories = [
        f"ID: {mem.get("id")}\nMemory: {mem.get("memory")}" 
        for mem in search_memory.get("results")
    ]

    print("Found memories : ", memories)

    SYSTEM_PROMPT = f"""
    Here is the context about the user:
    {memories}
    """

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            { "role": "system", "content": SYSTEM_PROMPT },
            { "role": "user", "content": user_query }
        ]
    )

    ai_response = response.choices[0].message.content

    print(f"AI > {json.dumps(ai_response)}")

    mem_client.add(
        user_id="suryansh",
        messages=[
            { "role": "user", "content": user_query },
            { "role": "assistant", "content": ai_response }
        ]
    )

    print("Memory has been saved ....")