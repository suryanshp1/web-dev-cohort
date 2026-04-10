from collections import defaultdict

def firstUniqChar(s: str) -> int:
    d = defaultdict(int)

    for c in s:
        d[c] = d[c] + 1

    for i, c in enumerate(s):
        if d[c] == 1:
            return i

    return -1


s = "loveleetcode"
print(firstUniqChar(s))