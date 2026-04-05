import os
from dotenv import load_dotenv
from langsmith import Client

load_dotenv()

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
os.environ["LANGSMITH_API_KEY"] = os.getenv("LANGSMITH_API_KEY")
os.environ["LANGSMITH_TRACING"] = os.getenv("LANGSMITH_TRACING")

## Create Data points
client = Client()

## Define the dataset - there are your test data
dataset_name = "Simple Chatbot Evaluation"
dataset = client.create_dataset(
    dataset_name=dataset_name
)

examples=[
    {
        "inputs": {"question": "What is LangChain?"},
        "outputs": {"answer": "A framework for building LLM applications"},
    },
    {
        "inputs": {"question": "What is LangSmith?"},
        "outputs": {
            "answer": "A platform for observing and evaluating LLM applications"
        },
    },
    {
        "inputs": {"question": "What is OpenAI?"},
        "outputs": {
            "answer": "A company that creates Large Language Models"
        },
    },
    {
        "inputs": {"question": "What is Google?"},
        "outputs": {
            "answer": "A technology company known for search"
        },
    },
    {
        "inputs": {"question": "What is Mistral?"},
        "outputs": {
            "answer": "A company that creates Large Language Models"
        },
    },
]


for example in examples:
    client.create_example(
        dataset_id=dataset.id,
        inputs=example["inputs"],
        outputs=example["outputs"],
    )