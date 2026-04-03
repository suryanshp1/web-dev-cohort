from typing_extensions import TypedDict
from langgraph.graph.message import add_messages
from langgraph.graph import StateGraph, START, END
from langchain.chat_models import init_chat_model
from dotenv import load_dotenv
from typing import Annotated

load_dotenv()

llm = init_chat_model(
    model="gpt-4.1-mini",
    model_provider="openai",
)

class State(TypedDict):
    messages: Annotated[list, add_messages]

def chatbot(state: State):
    response = llm.invoke(state.get("messages"))
    return { "messages": [response] }

def samplenode(state: State):
    print(f"\n\nInside samplenode node : {state}")
    return { "messages": ["Sample message appended."] }


graph_builder = StateGraph(State)

graph_builder.add_node("chatbot", chatbot)
graph_builder.add_node("samplenode", samplenode)

graph_builder.add_edge(START, "chatbot")
graph_builder.add_edge("chatbot", "samplenode")
graph_builder.add_edge("samplenode", END)

graph = graph_builder.compile()

updated_state = graph.invoke(State(
    {"messages": ["Hi, My name is Suryansh Pandey"]}
))

print("\n\nupdated_state : ", updated_state)

# (START) -> chatbot -> samplenode -> (END)
# state = { messages: ["Hey There"] }
# node runs: chatbot(state: ["Hey There"]) -> ["Hi, this is a message from Chatbot Node."]
# state = { messages: ["Hey There", "Hi, this is a message from Chatbot Node."] }