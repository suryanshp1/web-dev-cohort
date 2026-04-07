def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}

    for char in s:
        if char in mapping.values():  # opening brackets
            stack.append(char)
        elif char in mapping:  # closing brackets
            if not stack or stack[-1] != mapping[char]:
                return False
            stack.pop()

    return len(stack) == 0


patterns = ['([{}])[]', '()()()()', '{()}[]', '([{}])[', '()(()()', '{()}]', '({)}']

for p in patterns:
    print(p, "→", is_valid(p))