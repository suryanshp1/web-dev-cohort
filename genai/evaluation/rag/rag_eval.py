from langchain_community.document_loaders import WebBaseLoader
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chat_models import init_chat_model
from langchain_openai import ChatOpenAI
from langsmith import traceable, Client
from typing_extensions import Annotated, TypedDict
import os
from dotenv import load_dotenv

load_dotenv()

llm = init_chat_model(model="gpt-4o-mini")

dataset_name = "RAG Test Evaluation"

client = Client()

# List of URLs to load documents from
urls = [
    "https://lilianweng.github.io/posts/2023-06-23-agent/",
    "https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/",
    "https://lilianweng.github.io/posts/2023-10-25-adv-attack-llm/",
]

# Load documents from the URLs
docs = [WebBaseLoader(url).load() for url in urls]
docs_list = [item for sublist in docs for item in sublist]

# Initialize a text splitter with specified chunk size and overlap
text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
    chunk_size=250, chunk_overlap=0
)

# Split the documents into chunks
doc_splits = text_splitter.split_documents(docs_list)

# Add the document chunks to the vector store
vectorstore = InMemoryVectorStore.from_documents(
    documents=doc_splits,
    embedding=OpenAIEmbeddings(),
)

# Create a retriever component
retriever = vectorstore.as_retriever(k=6)

# print("============================")
# print(retriever.invoke("what is agent ?"))
# print("============================")

@traceable
def rag_bot(question: str):
    ## Relevant context
    docs = retriever.invoke(question)
    doc_string = " ".join(doc.page_content for doc in docs)

    instructions = f"""You are a helpful assistant who is good at \
    analyzing source information and answering questions. \
    Use the following source documents to answer the user's questions. \
    If you don't know the answer, just say that you don't know. \
    Use three sentences maximum and keep the answer concise.

    Documents:
    {doc_string}"""

    # llm invoke
    ai_msg = llm.invoke([
        {"role": "system", "content": instructions},
        {"role": "user", "content": question},
    ])

    return {"answer": ai_msg.content, "documents": docs}

# rag_bot("What is agents ?")

## Evaluators or Metrics

## Correctness - Does anwer match ground truth answer

# Correctness output schema

class CorrectnessGrade(TypedDict):
    explaination: Annotated[str, ..., "Explain your reasioning for the score"]
    correct: Annotated[bool, ..., "True if the answer is correct, False otherwise"]

# Correctness prompt

correctness_instructions = """You are a teacher grading a quiz.

You will be given a QUESTION, the GROUND TRUTH (correct) ANSWER, \
and the STUDENT ANSWER.

Here is the grade criteria to follow:
(1) Grade the student answers based ONLY on their factual accuracy \
relative to the ground truth answer.
(2) Ensure that the student answer does not contain any conflicting \
statements.
(3) It is OK if the student answer contains more information than \
the ground truth answer, as long as it is factually accurate \
relative to the ground truth answer.

Correctness:
A correctness value of True means that the student's answer meets \
all of the criteria.
A correctness value of False means that the student's answer does \
not meet all of the criteria.

Explain your reasoning in a step-by-step manner to ensure your \
reasoning and conclusion are correct.

Avoid simply stating the correct answer at the outset."""

grader_llm = ChatOpenAI(
    model="gpt-4o-mini", temperature=0
).with_structured_output(
    CorrectnessGrade, method="json_schema", strict=True
)

def correctness(
    inputs: dict, outputs: dict, reference_outputs: dict
) -> bool:
    """An evaluator for RAG answer accuracy"""
    answers = f"""\
QUESTION: {inputs['question']}
GROUND TRUTH ANSWER: {reference_outputs['answer']}
STUDENT ANSWER: {outputs['answer']}"""

    grade = grader_llm.invoke([
        {"role": "system", "content": correctness_instructions},
        {"role": "user", "content": answers},
    ])
    return grade["correct"]


## Relevance (Response vs Input) - This evaluator checks if the answer addresses the user’s question, without needing a reference answer

class RelevanceGrade(TypedDict):
    explanation: Annotated[
        str, ..., "Explain your reasoning for the score"
    ]
    relevant: Annotated[
        bool, ...,
        "Provide the score on whether the answer addresses the question",
    ]

relevance_instructions = """You are a teacher grading a quiz.

You will be given a QUESTION and a STUDENT ANSWER.

Here is the grade criteria to follow:
(1) Ensure the STUDENT ANSWER is concise and relevant to the QUESTION
(2) Ensure the STUDENT ANSWER helps to answer the QUESTION

Relevance:
A relevance value of True means that the student's answer meets \
all of the criteria.
A relevance value of False means that the student's answer does \
not meet all of the criteria.

Explain your reasoning in a step-by-step manner to ensure your \
reasoning and conclusion are correct.

Avoid simply stating the correct answer at the outset."""

relevance_llm = ChatOpenAI(
    model="gpt-4o", temperature=0
).with_structured_output(
    RelevanceGrade, method="json_schema", strict=True
)

def relevance(inputs: dict, outputs: dict) -> bool:
    """A simple evaluator for RAG answer helpfulness."""
    answer = (
        f"QUESTION: {inputs['question']}\n"
        f"STUDENT ANSWER: {outputs['answer']}"
    )
    grade = relevance_llm.invoke([
        {"role": "system", "content": relevance_instructions},
        {"role": "user", "content": answer},
    ])
    return grade["relevant"]

# Groundedness (Response vs Retrieved Documents) : This is the hallucination detector. It checks whether the answer is supported by the retrieved documents

class GroundedGrade(TypedDict):
    explanation: Annotated[
        str, ..., "Explain your reasoning for the score"
    ]
    grounded: Annotated[
        bool, ...,
        "Provide the score on if the answer hallucinates from the documents",
    ]

grounded_instructions = """You are a teacher grading a quiz.

You will be given FACTS and a STUDENT ANSWER.

Here is the grade criteria to follow:
(1) Ensure the STUDENT ANSWER is grounded in the FACTS.
(2) Ensure the STUDENT ANSWER does not contain "hallucinated" \
information outside the scope of the FACTS.

Grounded:
A grounded value of True means that the student's answer meets \
all of the criteria.
A grounded value of False means that the student's answer does \
not meet all of the criteria.

Explain your reasoning in a step-by-step manner to ensure your \
reasoning and conclusion are correct.

Avoid simply stating the correct answer at the outset."""

grounded_llm = ChatOpenAI(
    model="gpt-4o", temperature=0
).with_structured_output(
    GroundedGrade, method="json_schema", strict=True
)

def groundedness(inputs: dict, outputs: dict) -> bool:
    """A simple evaluator for RAG answer groundedness."""
    # print("==================OUT====================")
    # print(outputs)
    # print(dir(outputs))
    # print("==========================================")
    doc_string = "\n\n".join(
        doc.page_content for doc in outputs["documents"]
    )
    answer = f"FACTS: {doc_string}\nSTUDENT ANSWER: {outputs['answer']}"
    grade = grounded_llm.invoke([
        {"role": "system", "content": grounded_instructions},
        {"role": "user", "content": answer},
    ])
    return grade["grounded"]

## Retrieval Relevance - This evaluator checks the quality of your retrieval system itself — are the right documents being pulled?
class RetrievalRelevanceGrade(TypedDict):
    explanation: Annotated[
        str, ..., "Explain your reasoning for the score"
    ]
    relevant: Annotated[
        bool, ...,
        "True if the retrieved documents are relevant to the question, "
        "False otherwise",
    ]

retrieval_relevance_instructions = """You are a teacher grading a quiz.

You will be given a QUESTION and a set of FACTS provided by the student.

Here is the grade criteria to follow:
(1) Your goal is to identify FACTS that are completely unrelated \
to the QUESTION
(2) If the facts contain ANY keywords or semantic meaning related \
to the question, consider them relevant
(3) It is OK if the facts have SOME information that is unrelated \
to the question as long as (2) is met

Relevance:
A relevance value of True means that the FACTS contain ANY keywords \
or semantic meaning related to the QUESTION and are therefore relevant.
A relevance value of False means that the FACTS are completely \
unrelated to the QUESTION.

Explain your reasoning in a step-by-step manner to ensure your \
reasoning and conclusion are correct.

Avoid simply stating the correct answer at the outset."""

retrieval_relevance_llm = ChatOpenAI(
    model="gpt-4o", temperature=0
).with_structured_output(
    RetrievalRelevanceGrade, method="json_schema", strict=True
)

def retrieval_relevance(inputs: dict, outputs: dict) -> bool:
    """An evaluator for document relevance"""
    doc_string = "\n\n".join(
        doc.page_content for doc in outputs["documents"]
    )
    answer = f"FACTS: {doc_string}\nQUESTION: {inputs['question']}"
    grade = retrieval_relevance_llm.invoke([
        {"role": "system", "content": retrieval_relevance_instructions},
        {"role": "user", "content": answer},
    ])
    return grade["relevant"]

def target(inputs: dict) -> dict:
    return rag_bot(inputs["question"])

experiment_results = client.evaluate(
    target,
    data=dataset_name,
    evaluators=[
        correctness,
        groundedness,
        relevance,
        retrieval_relevance,
    ],
    experiment_prefix="rag-doc-relevance",
    metadata={"version": "LCEL context, gpt-4-0125-preview"},
)

# Explore results locally as a dataframe
experiment_results.to_pandas()