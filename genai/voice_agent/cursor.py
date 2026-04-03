# chain of thought prompting

from openai import OpenAI
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from typing import Optional
from openai import AsyncOpenAI
from openai.helpers import LocalAudioPlayer
import speech_recognition as sr
import asyncio
import requests
import json
import os

load_dotenv()

client = OpenAI()

async_client = AsyncOpenAI()

async def tts(speech: str):
    async with async_client.audio.speech.with_streaming_response.create(
        model="gpt-4o-mini-tts",
        voice="coral",
        input=speech,
        instructions="Always speak in cheerful manner with full of delight and happy.",
        response_format="pcm",
    ) as response:
        await LocalAudioPlayer().play(response)

def run_command(cmd: str):
    result = os.system(cmd)
    return result

def get_weather(city: str):
    url = f"https://wttr.in/{city.lower()}/?format=%C+%t"
    response = requests.get(url=url)
    if response.status_code == 200:
        return f"The weather in {city} is {response.text}"

available_tools = {
    "get_weather": get_weather,
    "run_command": run_command,
}

SYSTEM_PROMPT = """
You are an expert ai assistant in resolving user queries using chain of thought.
You work on START, PLAN and OUTPUT steps.
You need to forst PLAN what needs to be done. The PLAN can be multiple steps.
Once you think enough plan has been done, finally you can give an OUTPUT.
Do processing STEP BY STEP.
If the user request involves creating files, folders, or executing system operations,
you MUST call the appropriate TOOL (run_command).

Do NOT just describe the solution.
You MUST execute commands using TOOL step.

Never jump directly to OUTPUT without executing required TOOL steps.
for every tool call wait for the OBSERVE step which is output from the called tool.

Rules:
- Only run one step at a time.
- The sequence of steps is START (where user gives an input), PLAN (That can be
multiple times) and finally OUTPUT (which is going displayed to the user)

Output JSON format:
{"step": "START" | "PLAN" | "OUTPUT" | "TOOL" | "OBSERVE", "content": "string", "tool": "string", "input": "string"}

Available Tools:
- get_weather(city: str) : Takes city name as an input string and returns the weather information about the city.
- run_command(cmd: str) : Takes a system linux command as string and executes  the command on user's system and returns output from that command.

Example 1:
START: {"step": "START", "content": "Hey, can you solve 2 + 3 * 5 / 10"}
PLAN: {"step": "PLAN", "content": "Seems like user is interested in maths problem"}
PLAN: {"step": "PLAN", "content": "looking at the problem, we should solve this using BODMAS method"}
PLAN: {"step": "PLAN", "content": "Yes, The BODMAS is correct thing to be done here"}
PLAN: {"step": "PLAN", "content": "first we must multiply 3 * 5 which is 15"}
PLAN: {"step": "PLAN", "content": "Now new equation is 2 + 15 / 10"}
PLAN: {"step": "PLAN", "content": "We must perform divide that is 15 / 10 = 1.5"}
PLAN: {"step": "PLAN", "content": "Now new equation is 2 + 1.5"}
PLAN: {"step": "PLAN", "content": "Now finally lets perform the add 2 + 1.5 = 3.5"}
PLAN: {"step": "PLAN", "content": "Great finally we have solved and finally left with 3.5 as ans"}
PLAN: {"step": "OUTPUT", "content": "3.5"}

Example 2:
START: {"step": "START", "content": "What is the weather of delhi ?"}
PLAN: {"step": "PLAN", "content": "Seems like user is interested in getting weather of delhi India"}
PLAN: {"step": "PLAN", "content": "Lets see if we have available tool from the list of available tools"}
PLAN: {"step": "PLAN", "content": "Great we have get_weather tool available for this query"}
PLAN: {"step": "PLAN", "content": "I need to call get_weather tool for delhi as input for city"}
PLAN: {"step": "TOOL", "tool": "get_weather", "input": "delhi"}
PLAN: {"step": "OBSERVE", "content": "The temp of delhi is cloudy with 20 C"}
PLAN: {"step": "PLAN", "content": "Great, I got the weather info about delhi"}
PLAN: {"step": "OUTPUT", "content": "The current weather in delhi is 20 C with some cloudy sky"}

Important:
- Always return JSON
- Never return plain text
"""

print("\n\n\n\n")

class MyOutputFormat(BaseModel):
    step: str = Field(..., description="The ID of the step. Example: PLAN, OUTPUT, TOOL, etc")
    content: Optional[str] = Field(None, description="The optional string content for the step")
    tool: Optional[str] = Field(None, description="The ID of tool to call.")
    input: Optional[str] = Field(None, description="The input params for the tool")

message_history = [
    {
        "role": "system",
        "content": SYSTEM_PROMPT
    }
]

r = sr.Recognizer()
with sr.Microphone() as source: # mic acess
    r.adjust_for_ambient_noise(source)
    r.pause_threshold = 2

    while True:
        print("Speak something ....")
        audio = r.listen(source)

        print("Processing audio .... (STT)")
        user_query = r.recognize_google(audio)

        message_history.append(
            {
                "role": "user",
                "content": user_query,
            }
        )

        while True:
            response = client.chat.completions.parse(
                model="gpt-4.1",
                response_format=MyOutputFormat,
                messages=message_history,
            )

            raw_result = (response.choices[0].message.content)
            parsed_result = response.choices[0].message.parsed
            message_history.append(
                {
                    "role": "assistant",
                    "content": raw_result,
                }
            )

            if parsed_result.step == "START":
                print("starting LLM loop ....", parsed_result.content)
                continue

            if parsed_result.step == "TOOL":
                tool_to_call = parsed_result.tool
                tool_input = parsed_result.input

                tool_response = available_tools[tool_to_call](tool_input)

                print(f"Tool ....  {tool_to_call} ({tool_input}) = ({tool_response})")

                message_history.append(
                    {
                        "role": "developer",
                        "content": json.dumps(
                            {"step": "OBSERVE", "tool": tool_to_call, "input": tool_input, "output": tool_response}
                        )
                    }
                )
                continue
            
            if parsed_result.step == "PLAN":
                print("PLAN: ", parsed_result.content)
                continue

            if parsed_result.step == "OUTPUT":
                print("OUTPUT: ", parsed_result.content)
                asyncio.run(tts(speech=parsed_result.content))
                break

print("\n\n\n\n")