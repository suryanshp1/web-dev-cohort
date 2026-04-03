import tiktoken

enc = tiktoken.encoding_for_model("gpt-4o")

text = "Hey There! My name is Suryansh"

tokens = enc.encode(text)

# Tokens : [25216, 3274, 0, 3673, 1308, 382, 336, 4248, 616, 71]
print(f"Tokens : {tokens}")

decoded = enc.decode([25216, 3274, 0, 3673, 1308, 382, 336, 4248, 616, 71])
print(f"Decoded : {decoded}")