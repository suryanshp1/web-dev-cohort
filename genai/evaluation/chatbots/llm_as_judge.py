## LLM as a judge
## Define metrices

import os
import openai
from dotenv import load_dotenv
from langsmith import Client, wrappers

load_dotenv()

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
os.environ["LANGSMITH_API_KEY"] = os.getenv("LANGSMITH_API_KEY")
os.environ["LANGSMITH_TRACING"] = os.getenv("LANGSMITH_TRACING")

## Create Data points
client = Client()
openai_client = wrappers.wrap_openai(openai.OpenAI())
dataset_name = "Simple Chatbot Evaluation"

EVAL_INSTRUCTIONS = """
You are an expert professor specialized in grading students answers to questions.
"""

def correctness(inputs: dict, outputs: dict, reference_outputs: dict) -> bool:
    USER_CONTENT = f"""You are grading the following question:
    {inputs['question']}
    Here is the real answer:
    {reference_outputs['answer']}
    You are grading the following predicted answer:
    {outputs['response']}
    Respond with CORRECT or INCORRECT:
    Grade:
    """

    response = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        temperature=0,
        messages=[
            {"role": "system", "content": EVAL_INSTRUCTIONS},
            {"role": "user", "content": USER_CONTENT},
        ]
    ).choices[0].message.content

    return response == "CORRECT"


## Concisions -  A simple heuristic check that the response isn’t excessively verbose

def concision(outputs: dict, reference_outputs: dict) -> bool:
    return int(
        len(outputs["response"]) < 2 * len(reference_outputs["answer"])
    )

## Run Evaluation

DEFAULT_INSTRUCTION = """
Respond to the users question in a short, concise manner (one short sentence).
"""
def my_app(
    question: str,
    model: str = "gpt-4o-mini",
    instructions: str = DEFAULT_INSTRUCTION,
) -> str:
    return openai_client.chat.completions.create(
        model=model,
        temperature=0,
        messages=[
            {"role": "system", "content": instructions},
            {"role": "user", "content": question},
        ],
    ).choices[0].message.content

## Call my_app fro every data points

# Wrapper function that maps dataset inputs to app outputs
def ls_target(inputs: str) -> dict:
    return {"response": my_app(inputs["question"], model="gpt-4-turbo")}

## Run our evaluation
experiment_results = client.evaluate(
    ls_target, ## Your AI system
    data=dataset_name,
    evaluators=[correctness, concision],
    experiment_prefix="openai-4-turbo-chatbot-eval-experiment",
    description="Evaluating the accuracy of a simple prediction model.",
    metadata={
        "my-prompt-version": "abcd-1234",
    },
)

print(experiment_results)