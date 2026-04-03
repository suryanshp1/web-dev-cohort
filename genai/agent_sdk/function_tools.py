import json
import requests
from typing_extensions import TypedDict, Any
from agents import Agent, FunctionTool, RunContextWrapper, function_tool, Runner
from dotenv import load_dotenv

load_dotenv()

@function_tool  
def fetch_weather(city: str):
    """
    Fetch the weather of the given city name
    Args:
        city: The city name to fetch the weather for
    """
    url = f"https://wttr.in/{city.lower()}/?format=%C+%t"
    response = requests.get(url=url)
    if response.status_code == 200:
        return f"The weather in {city} is {response.text}"
    
    return "Something went wrong"


agent = Agent(
    name="Weather Assistant",
    instructions="You're an agent which help user to get weather info of given city",
    tools=[fetch_weather],  
)

# for tool in agent.tools:
#     if isinstance(tool, FunctionTool):
#         print(tool.name)
#         print(tool.description)
#         print(json.dumps(tool.params_json_schema, indent=2))
#         print()

result = Runner.run_sync(agent, "Hey can you please weather info for Ghazipur and Hyderabad")

print(result.final_output)