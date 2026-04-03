from dotenv import load_dotenv
from agents import Agent, Runner
from typing import Any

load_dotenv()

# Define an agent
hello_agent = Agent[Any](
    name="Hello World Agent",
    instructions="You're an agent which greets the user and helps them answer using emojis and in funny way"
)

result = Runner.run_sync(hello_agent, "Hey there my name is Suryansh Pandey")

print(result.final_output)