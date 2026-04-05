from langsmith import Client
from dotenv import load_dotenv

load_dotenv()

client = Client()

examples = [
    {
        "inputs": {
            "question": "How does the ReAct agent use self-reflection?"
        },
        "outputs": {
            "answer": "ReAct integrates reasoning and acting, performing "
            "actions - such tools like Wikipedia search API - and then "
            "observing / reasoning about the tool outputs."
        },
    },
    {
        "inputs": {
            "question": "What are the types of biases that can arise "
            "with few-shot prompting?"
        },
        "outputs": {
            "answer": "The biases that can arise with few-shot prompting "
            "include (1) Majority label bias, (2) Recency bias, and "
            "(3) Common token bias."
        },
    },
    {
        "inputs": {
            "question": "What are five types of adversarial attacks?"
        },
        "outputs": {
            "answer": "Five types of adversarial attacks are "
            "(1) Token manipulation, (2) Gradient based attack, "
            "(3) Jailbreak prompting, (4) Human red-teaming, "
            "(5) Model red-teaming."
        },
    },
]

dataset_name = "RAG Test Evaluation"
dataset = client.create_dataset(dataset_name=dataset_name)
for example in examples:
    client.create_example(
        dataset_id=dataset.id,
        inputs=example["inputs"],
        outputs=example["outputs"],
    )