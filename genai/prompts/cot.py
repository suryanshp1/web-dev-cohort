# chain of thought prompting

from openai import OpenAI
from dotenv import load_dotenv
import json

load_dotenv()

client = OpenAI()

SYSTEM_PROMPT = """
You are an expert ai assistant in resolving user queries using chain of thought.
You work on START, PLAN and OUTPUT steps.
You need to forst PLAN what needs to be done. The PLAN can be multiple steps.
Once you think enough plan has been done, finally you can give an OUTPUT.
Do processing STEP BY STEP.

Rules:
- Only run one step at a time.
- The sequence of steps is START (where user gives an input), PLAN (That can be
multiple times) and finally OUTPUT (which is going displayed to the user)

Output JSON format:
{"step": "START" | "PLAN" | "OUTPUT", "content": "string"}

Example:
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

Important:
- Always return JSON
- Never return plain text
"""

print("\n\n\n\n")

message_history = [
    {
        "role": "system",
        "content": SYSTEM_PROMPT
    }
]

user_query = input("USER: ")
message_history.append(
    {
        "role": "user",
        "content": user_query,
    }
)

while True:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={"type": "json_object"},
        messages=message_history,
    )

    raw_result = (response.choices[0].message.content)
    parsed_result = json.loads(raw_result)
    message_history.append(
        {
            "role": "assistant",
            "content": raw_result,
        }
    )

    if parsed_result.get("step") == "START":
        print("starting LLM loop ....", parsed_result.get("content"))
        continue
    
    if parsed_result.get("step") == "PLAN":
        print("PLAN: ", parsed_result.get("content"))
        continue

    if parsed_result.get("step") == "OUTPUT":
        print("OUTPUT: ", parsed_result.get("content"))
        break

print("\n\n\n\n")

# response = client.chat.completions.create(
#     model="gemini-2.5-flash",
#     response_format={"type": "json_object"},
#     messages=[
#         {
#             "role": "system",
#             "content": SYSTEM_PROMPT,
#         },
#         {"role": "user", "content": "Write a code to add n numbers in javascript"},
#         # Manually keep adding messages to the history
#         {
#             "role": "assistant",
#             "content": json.dumps(
#                 {
#                     "step": "START",
#                     "content": "Write a code to add n numbers in javascript",
#                 }
#             ),
#         },
#         {
#             "role": "assistant",
#             "content": json.dumps(
#                 {
#                     "step": "PLAN",
#                     "content": "The user wants a JavaScript function to add 'n' numbers. I should provide a function that can accept a variable number of arguments and sum them up.",
#                 }
#             ),
#         },
#         {
#             "role": "assistant",
#             "content": json.dumps(
#                 {"step": "PLAN", "content": "I will define a JavaScript function that uses the rest parameter syntax to accept any number of arguments."}
#             ),
#         },
#         {
#             "role": "assistant",
#             "content": json.dumps(
#                 {"step": "PLAN", "content": "Inside the function, I will initialize a sum variable to 0. Then, I will iterate through the arguments and add each one to the sum."}
#             ),
#         },
#         {
#             "role": "assistant",
#             "content": json.dumps(
#                 {"step": "PLAN", "content": "I will use the `reduce` method on the array of arguments to sum them up efficiently."}
#            ),
#         },
#         {
#             "role": "assistant",
#             "content": json.dumps(
#                 {"step": "PLAN", "content": "Finally, I will return the calculated sum."}
#             ),
#         },
#         {
#             "role": "assistant",
#             "content": json.dumps(
#                 {"step": "OUTPUT", "content": "```javascript\nfunction addNumbers(...numbers) {\n  // The '...numbers' syntax allows the function to accept any number of arguments\n  // and treats them as an array named 'numbers'.\n\n  // Using the reduce method to sum all numbers in the array.\n  // 'accumulator' is the running total, 'currentNumber' is the current element.\n  // '0' is the initial value of the accumulator.\n  return numbers.reduce((accumulator, currentNumber) => accumulator + currentNumber, 0);\n}\n\n// Example usage:\nconsole.log(addNumbers(1, 2, 3));         // Output: 6\nconsole.log(addNumbers(10, 20, 30, 40));  // Output: 100\nconsole.log(addNumbers(5));               // Output: 5\nconsole.log(addNumbers());                // Output: 0 (if no arguments are passed, the array is empty, reduce returns initial value)\nconsole.log(addNumbers(-1, 5, -3));       // Output: 1\n```"}
#             ),
#         },
#     ],
# )

# print(response.choices[0].message.content)
