from dotenv import load_dotenv
from agents import Agent, Runner
from agents import WebSearchTool
from typing import Any

load_dotenv()

# Define an agent with hosted tools
hello_agent = Agent[Any](
    name="Hello World Agent",
    instructions="You're an agent which greets the user and helps them answer using emojis and in funny way",
    tools=[
        WebSearchTool(),
    ]
)

result = Runner.run_sync(hello_agent, "Hey can you please weather info for Ghazipur, Uttar Pradesh")

print(result.final_output)