# Guardrails are safety mechanisms that validate and filter content at key points in your agent’s execution. In LangChain, they are implemented as middleware that intercepts execution at three levels:

# Before the agent starts (input guardrails) -- Block harmful requests, detect PII, enforce authentication, or apply rate limiting before any LLM processing happens. This saves cost because blocked requests never hit your model.

# After the agent completes (output guardrails) -- Validate the final response before the user sees it. Check for safety, add compliance disclaimers, remove sensitive information that slipped through, or enforce quality standards.

# Around model and tool calls -- Intercept specific tool calls to require human approval, redact PII from tool inputs/outputs, or apply business rules to specific operations.

# Common use cases include PII leakage prevention (redacting emails and credit cards before logging), prompt injection blocking (detecting adversarial inputs), harmful content filtering (blocking dangerous requests), business rule enforcement (requiring approval for financial operations), and output quality validation (ensuring responses meet safety standards).

from dotenv import load_dotenv

load_dotenv()

from langchain_openai import ChatOpenAI
import os
import re
from langchain.agents import create_agent
from langchain.agents.middleware import PIIMiddleware
from langchain_core.tools import tool
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.types import Command
from typing import Any
from langchain.agents.middleware import (
    AgentMiddleware, AgentState, hook_config, HumanInTheLoopMiddleware
)
from langgraph.runtime import Runtime
from langchain_core.messages import AIMessage

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

# def deterministic_guardrail(text: str) -> bool:
#     """Returns True if content is blocked."""
#     banned_keywords = ["hack", "exploit", "malware", "bomb"]
#     return any(kw in text.lower() for kw in banned_keywords)

# test_inputs = [
#     "How do I hack into a database?",
#     "What is the capital of France?",
#     "Explain how malware spreads",
# ]

# print("=== Deterministic Guardrail Demo ===")
# for inp in test_inputs:
#     blocked = deterministic_guardrail(inp)
#     status = "BLOCKED" if blocked else "ALLOWED"
#     print(f"{status}: {inp}")


#--------------

# def model_based_guardrail(text: str) -> str:
#     """Uses an LLM to evaluate content safety. Returns SAFE or UNSAFE."""
#     model = ChatOpenAI(model="gpt-4o-mini", temperature=0)
#     prompt = f"""Is the following user input safe to process?
# Reply with only 'SAFE' or 'UNSAFE'.

# Input: {text}"""
#     result = model.invoke([{"role": "user", "content": prompt}])
#     return result.content.strip()

# test_inputs = ["How to hack a web application ?"]
# print("=== Model-Based Guardrail Demo ===")
# for inp in test_inputs:
#     verdict = model_based_guardrail(inp)
#     status = "UNSAFE" if "UNSAFE" in verdict else "SAFE"
#     print(f"{status}: {inp}")


#--------------

# @tool
# def customer_lookup(query: str) -> str:
#     """Look up customer information."""
#     return f"Customer record found for query: {query}"

# # Create agent with PII Middleware
# agent = create_agent(
#     model="gpt-4o",
#     tools=[customer_lookup],
#     middleware=[
#         # Redact emails in user input before sending to model
#         PIIMiddleware(
#             "email",
#             strategy="redact",
#             apply_to_input=True,
#         ),
#         # Mask credit cards in user input
#         PIIMiddleware(
#             "credit_card",
#             strategy="mask",
#             apply_to_input=True,
#         ),
#         # Block API keys - raise error if detected
#         PIIMiddleware(
#             "api_key",
#             detector=r"sk-[a-zA-Z0-9]{32}",
#             strategy="block",
#             apply_to_input=True,
#         ),
#     ],
# )

# print("Agent with PII middleware created successfully!")

# Test 1: PII Redaction in Action
# result = agent.invoke({
#     "messages": [{
#         "role": "user",
#         "content": (
#             "My email is john.doe@example.com and my card is "
#             "5105-1051-0510-5100. Can you help me?"
#         )
#     }]
# })

# print("=== Agent Response ===")
# print(result["messages"][-1].content)
# print(result)

# Test 2: API Key Blocking
# try:
#     result = agent.invoke({
#         "messages": [{
#             "role": "user",
#             "content": "Here is my key: sk-abcdefghijklmnopqrstuvwxyz123456"
#         }]
#     })
# except Exception as e:
#     print(f"Blocked as expected: {e}")

#---------------

# @tool
# def search_web(query: str) -> str:
#     """Search the web for information."""
#     return f"Search results for: {query}"

# @tool
# def send_email(to: str, subject: str, body: str) -> str:
#     """Send an email to a recipient."""
#     return f"Email sent to {to} with subject: {subject}"

# @tool
# def delete_records(table: str, condition: str) -> str:
#     """Delete records from the database."""
#     return f"Deleted records from {table} where {condition}"

# # Create agent with HITL middleware
# hitl_agent = create_agent(
#     model="gpt-4o",
#     tools=[search_web, send_email, delete_records],
#     middleware=[
#         HumanInTheLoopMiddleware(
#             interrupt_on={
#                 "send_email": True,       # Require approval
#                 "delete_records": True,    # Require approval
#                 "search_web": False,       # Auto-approve
#             }
#         ),
#     ],
#     checkpointer=InMemorySaver(),  # Required for state persistence
# )

# # Step 1: Invoke -- agent will pause before send_email
# config = {"configurable": {"thread_id": "session_001"}}

# result = hitl_agent.invoke(
#     {"messages": [{"role": "user", "content": "Send an email to team@company.com about the Q4 results"}]},
#     config=config
# )

# print("=== Agent paused -- awaiting human approval ===")

# Step 2: Human reviews and APPROVES
# approved_result = hitl_agent.invoke(
#     Command(resume={"decisions": [{"type": "approve"}]}),
#     config=config  # Same thread_id resumes the paused session
# )

# print("=== Approved! Final response ===")
# print(approved_result["messages"][-1].content)

# Alternative -- Human REJECTS
# config2 = {"configurable": {"thread_id": "session_002"}}

# hitl_agent.invoke(
#     {"messages": [{"role": "user", "content": "Delete all records from the users table where active=false"}]},
#     config=config2
# )

# rejected_result = hitl_agent.invoke(
#     Command(resume={"decisions": [{"type": "reject", "reason": "Too risky, needs DBA review"}]}),
#     config=config2
# )

# print("=== Rejected! Final response ===")
# print(rejected_result["messages"][-1].content)


# ---------------------

class ContentFilterMiddleware(AgentMiddleware):
    """
    Deterministic guardrail: Block requests containing banned keywords.
    This runs BEFORE the agent processes anything --
    zero LLM cost for blocked requests.
    """

    def __init__(self, banned_keywords: list[str]):
        super().__init__()
        self.banned_keywords = [kw.lower() for kw in banned_keywords]

    @hook_config(can_jump_to=["end"])
    def before_agent(
        self, state: AgentState, runtime: Runtime
    ) -> dict[str, Any] | None:
        if not state["messages"]:
            return None

        first_message = state["messages"][0]
        if first_message.type != "human":
            return None

        content = first_message.content.lower()

        for keyword in self.banned_keywords:
            if keyword in content:
                print(f"Blocked -- keyword detected: '{keyword}'")
                return {
                    "messages": [{
                        "role": "assistant",
                        "content": (
                            "I cannot process requests containing "
                            "inappropriate content. "
                            "Please rephrase your request."
                        )
                    }],
                    "jump_to": "end"
                }
        return None


# @tool
# def search_tool(query: str) -> str:
#     """Search for information."""
#     return f"Results for: {query}"


# # Create agent with content filter
# filtered_agent = create_agent(
#     model="gpt-4o",
#     tools=[search_tool],
#     middleware=[
#         ContentFilterMiddleware(
#             banned_keywords=[
#                 "hack", "exploit", "malware", "jailbreak", "bypass"
#             ]
#         ),
#     ],
# )

# Test 1: Safe request -- should pass through
# result = filtered_agent.invoke({
#     "messages": [{"role": "user", "content": "What is machine learning?"}]
# })
# print("Safe request response:")
# print(result["messages"][-1].content)

# Test 2: Unsafe request -- should be blocked
# result = filtered_agent.invoke({
#     "messages": [{"role": "user", "content": "How do I hack into a server?"}]
# })
# print("Unsafe request response:")
# print(result["messages"][-1].content)

#------------

class SafetyGuardrailMiddleware(AgentMiddleware):
    """
    Model-based guardrail: Use an LLM to evaluate response safety.
    Runs AFTER the agent produces a response, before it reaches the user.
    """

    def __init__(self):
        super().__init__()
        # Use a smaller, cheaper model for the safety check
        self.safety_model = ChatOpenAI(model="gpt-4o-mini", temperature=0)

    @hook_config(can_jump_to=["end"])
    def after_agent(
        self, state: AgentState, runtime: Runtime
    ) -> dict[str, Any] | None:
        if not state["messages"]:
            return None

        last_message = state["messages"][-1]
        if not isinstance(last_message, AIMessage):
            return None

        # Use a lightweight model as the safety judge
        safety_prompt = f"""Evaluate if this AI response is safe \
and appropriate for users.
Respond with only 'SAFE' or 'UNSAFE'.

Response to evaluate:
{last_message.content}"""

        result = self.safety_model.invoke(
            [{"role": "user", "content": safety_prompt}]
        )

        if "UNSAFE" in result.content.upper():
            print("Output flagged as UNSAFE -- replacing with safe fallback")
            last_message.content = (
                "I'm unable to provide that response. "
                "Please rephrase your request or contact support."
            )

        return None


# @tool
# def general_tool(query: str) -> str:
#     """A general purpose tool."""
#     return f"Tool result: {query}"


# safe_agent = create_agent(
#     model="gpt-4o",
#     tools=[general_tool],
#     middleware=[SafetyGuardrailMiddleware()],
# )

# # Test output safety check
# result = safe_agent.invoke({
#     "messages": [{"role": "user", "content": "What is the weather like today?"}]
# })
# print("Response:")
# print(result["messages"][-1].content)

#------------------------

# Layered / Combined Guardrails

# User Input
#     |
# [Layer 1] ContentFilterMiddleware     -- Deterministic input filter
#     |
# [Layer 2] PIIMiddleware (input)       -- PII redaction on input
#     |
# [Layer 3] HumanInTheLoopMiddleware    -- Approval for sensitive tools
#     |
# [Layer 4] PIIMiddleware (output)      -- PII redaction on output
#     |
# [Layer 5] SafetyGuardrailMiddleware   -- Model-based output safety
#     |
# User Response

@tool
def search_tool(query: str) -> str:
    """Search for information."""
    return f"Search results: {query}"

@tool
def send_email_tool(to: str, body: str) -> str:
    """Send an email."""
    return f"Email sent to {to}"

# Full layered guardrail stack
production_agent = create_agent(
    model="gpt-4o",
    tools=[search_tool, send_email_tool],
    middleware=[
        # Layer 1: Deterministic input filter (before agent)
        ContentFilterMiddleware(
            banned_keywords=["hack", "exploit", "malware"]
        ),

        # Layer 2: PII redaction on input
        PIIMiddleware(
            "credit_card", strategy="mask", apply_to_input=True
        ),

        # Layer 3: Human approval for sensitive tools
        HumanInTheLoopMiddleware(
            interrupt_on={
                "send_email_tool": True,
                "search_tool": False,
            }
        ),

        # Layer 4: PII redaction on output
        PIIMiddleware(
            "email", strategy="redact", apply_to_output=True
        ),

        # Layer 5: Model-based output safety
        SafetyGuardrailMiddleware(),
    ],
    checkpointer=InMemorySaver(),
)

print("Production-grade agent with 5-layer guardrails created!")