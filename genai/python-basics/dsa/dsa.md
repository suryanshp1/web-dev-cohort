Here’s a **well-curated collection of common Python coding questions** frequently asked in startups (especially for backend / AI / general SDE roles). I’ve grouped them by category so you can prepare systematically.

---

# 🔥 1. Strings (VERY COMMON)

These test basic logic + edge cases.

### ⭐ Questions:

* Check if parentheses are valid (your current problem)
* Reverse a string (without slicing)
* Check if a string is a palindrome
* Find first non-repeating character
* Longest substring without repeating characters
* Group anagrams
* String compression (`aaabb → a3b2`)
* Check if two strings are rotations

### 💡 Example:

```python
# First non-repeating character
def first_unique(s):
    from collections import Counter
    count = Counter(s)
    for c in s:
        if count[c] == 1:
            return c
```

---

# 🔥 2. Lists / Arrays

Startups LOVE these.

### ⭐ Questions:

* Flatten a nested list (you already asked this!)
* Two sum / Three sum
* Move zeros to end
* Find duplicates in array
* Merge overlapping intervals
* Kadane’s Algorithm (max subarray sum)
* Rotate array
* Find missing number

### 💡 Example:

```python
# Move zeros to end
def move_zeros(arr):
    j = 0
    for i in range(len(arr)):
        if arr[i] != 0:
            arr[j], arr[i] = arr[i], arr[j]
            j += 1
    return arr
```

---

# 🔥 3. Hashing (Dict / Set Based)

These are **high-frequency startup questions**.

### ⭐ Questions:

* Two sum (optimized)
* Frequency count of elements
* Find intersection of two arrays
* Longest consecutive sequence
* Subarray with given sum

---

# 🔥 4. Stack & Queue

Your bracket problem belongs here.

### ⭐ Questions:

* Valid parentheses
* Min stack
* Next greater element
* Evaluate postfix expression
* Sliding window maximum (deque)

---

# 🔥 5. Recursion & Backtracking

Used in AI/ML startups too.

### ⭐ Questions:

* Generate all subsets
* Permutations of a list
* N-Queens problem
* Combination sum
* Word search in grid

---

# 🔥 6. Sorting & Searching

### ⭐ Questions:

* Implement binary search
* Find peak element
* Kth largest element
* Merge sort / Quick sort (basic understanding)
* Search in rotated sorted array

---

# 🔥 7. Linked List (Moderate importance)

### ⭐ Questions:

* Reverse a linked list
* Detect cycle (Floyd’s algorithm)
* Merge two sorted linked lists
* Find middle node

---

# 🔥 8. Python-Specific (VERY IMPORTANT FOR STARTUPS)

This is where many candidates fail.

### ⭐ Questions:

* Difference between `list`, `tuple`, `set`
* Deep copy vs shallow copy
* Decorators (write one)
* Generators vs iterators
* GIL (Global Interpreter Lock)
* Mutable vs immutable types
* List vs dict performance

### 💡 Example:

```python
# Generator example
def count_up(n):
    for i in range(n):
        yield i
```

---

# 🔥 9. File Handling / Practical Coding

Startups love real-world tasks.

### ⭐ Questions:

* Read large file efficiently
* Parse JSON logs
* Count word frequency from file
* Process CSV data

---

# 🔥 10. APIs & Backend-Oriented (IMPORTANT for you)

Since you’re backend-focused:

### ⭐ Questions:

* Build simple API using FastAPI
* Rate limiter implementation
* Caching (LRU cache)
* Retry mechanism
* Logging middleware

### 💡 Example (LRU Cache):

```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cache = OrderedDict()
        self.capacity = capacity

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key, value):
        self.cache[key] = value
        self.cache.move_to_end(key)
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)
```

---

# 🔥 11. Bonus: AI/ML + Backend Combo (Hot in startups)

Since you mentioned RAG + FastAPI earlier:

### ⭐ Questions:

* Implement simple RAG pipeline logic
* Chunking + embedding logic
* Cosine similarity
* Build chatbot memory
* Streaming responses

---

# 🧠 How to Prepare Smartly (Important)

Instead of solving 500 questions:

* Do **~60–80 high-quality problems**
* Focus on:

  * Patterns (stack, sliding window, hashmap)
  * Writing clean Python
  * Explaining your logic

---

# 🚀 If You Want Next Level Prep

I can also:

* Give **Top 50 MUST-DO questions (with solutions)**
* Conduct a **mock interview (startup-style)**
* Focus on **FastAPI + AI backend interview prep (very relevant for you)**

Just tell me 👍


======

# Top 50 Python DSA Interview Questions with Answers & Explanation

These are the most commonly asked Easy → Medium level DSA questions for backend/Python developer interviews.

Focus especially on:

* Hashmaps
* Sliding Window
* Two Pointers
* Stack/Queue
* Heap
* BFS/DFS
* Intervals

Not hardcore competitive programming.

---

# 1. Two Sum

## Question

Find two indices whose values add to target.

## Solution

```python id="x6f3iy"
def twoSum(nums, target):
    seen = {}

    for i, num in enumerate(nums):
        diff = target - num

        if diff in seen:
            return [seen[diff], i]

        seen[num] = i
```

## Explanation

Use hashmap for O(1) lookup.

Time: O(n)

---

# 2. Valid Parentheses

## Question

Check if brackets are balanced.

## Solution

```python id="6dq0r5"
def isValid(s):
    stack = []
    mp = {')': '(', '}': '{', ']': '['}

    for ch in s:
        if ch in mp.values():
            stack.append(ch)
        else:
            if not stack or stack.pop() != mp[ch]:
                return False

    return not stack
```

## Explanation

Stack tracks opening brackets.

---

# 3. Maximum Subarray (Kadane)

## Solution

```python id="kjkh52"
def maxSubArray(nums):
    curr = ans = nums[0]

    for n in nums[1:]:
        curr = max(n, curr + n)
        ans = max(ans, curr)

    return ans
```

## Explanation

Track best sum ending at current index.

---

# 4. Best Time to Buy and Sell Stock

## Solution

```python id="bhcf5i"
def maxProfit(prices):
    min_price = float('inf')
    profit = 0

    for p in prices:
        min_price = min(min_price, p)
        profit = max(profit, p - min_price)

    return profit
```

---

# 5. Contains Duplicate

## Solution

```python id="o0m1e2"
def containsDuplicate(nums):
    return len(nums) != len(set(nums))
```

---

# 6. Reverse Linked List

## Solution

```python id="zib4l6"
def reverseList(head):
    prev = None

    while head:
        nxt = head.next
        head.next = prev
        prev = head
        head = nxt

    return prev
```

---

# 7. Merge Two Sorted Lists

## Solution

```python id="iw5g9y"
def mergeTwoLists(l1, l2):
    dummy = ListNode()
    cur = dummy

    while l1 and l2:
        if l1.val < l2.val:
            cur.next = l1
            l1 = l1.next
        else:
            cur.next = l2
            l2 = l2.next

        cur = cur.next

    cur.next = l1 or l2
    return dummy.next
```

---

# 8. Binary Search

## Solution

```python id="wlt8rf"
def binarySearch(nums, target):
    l, r = 0, len(nums)-1

    while l <= r:
        mid = (l+r)//2

        if nums[mid] == target:
            return mid

        if nums[mid] < target:
            l = mid + 1
        else:
            r = mid - 1

    return -1
```

---

# 9. Valid Anagram

## Solution

```python id="9vrw5q"
from collections import Counter

def isAnagram(s, t):
    return Counter(s) == Counter(t)
```

---

# 10. Product of Array Except Self

## Solution

```python id="pv9b4x"
def productExceptSelf(nums):
    n = len(nums)
    res = [1] * n

    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]

    postfix = 1
    for i in range(n-1, -1, -1):
        res[i] *= postfix
        postfix *= nums[i]

    return res
```

---

# 11. Longest Substring Without Repeating Characters

## Solution

```python id="iknd8u"
def lengthOfLongestSubstring(s):
    seen = set()
    l = 0
    ans = 0

    for r in range(len(s)):
        while s[r] in seen:
            seen.remove(s[l])
            l += 1

        seen.add(s[r])
        ans = max(ans, r-l+1)

    return ans
```

## Pattern

Sliding window.

---

# 12. Move Zeroes

## Solution

```python id="jlwm5h"
def moveZeroes(nums):
    idx = 0

    for n in nums:
        if n != 0:
            nums[idx] = n
            idx += 1

    while idx < len(nums):
        nums[idx] = 0
        idx += 1
```

---

# 13. Palindrome Number

## Solution

```python id="m4vr2i"
def isPalindrome(x):
    return str(x) == str(x)[::-1]
```

---

# 14. Valid Palindrome

## Solution

```python id="23l7bx"
def isPalindrome(s):
    s = ''.join(c.lower() for c in s if c.isalnum())
    return s == s[::-1]
```

---

# 15. Climbing Stairs

## Solution

```python id="8nqkhv"
def climbStairs(n):
    a, b = 1, 1

    for _ in range(n):
        a, b = b, a+b

    return a
```

---

# 16. Fibonacci Number

## Solution

```python id="91wk5d"
def fib(n):
    if n <= 1:
        return n

    a, b = 0, 1

    for _ in range(2, n+1):
        a, b = b, a+b

    return b
```

---

# 17. Missing Number

## Solution

```python id="gmj6r3"
def missingNumber(nums):
    n = len(nums)
    return n*(n+1)//2 - sum(nums)
```

---

# 18. Single Number

## Solution

```python id="u7ywtw"
def singleNumber(nums):
    ans = 0

    for n in nums:
        ans ^= n

    return ans
```

## Explanation

XOR cancels duplicates.

---

# 19. Majority Element

## Solution

```python id="d7nqkn"
def majorityElement(nums):
    count = 0
    candidate = None

    for n in nums:
        if count == 0:
            candidate = n

        count += 1 if n == candidate else -1

    return candidate
```

---

# 20. Merge Intervals

## Solution

```python id="jl5ezf"
def merge(intervals):
    intervals.sort()
    res = [intervals[0]]

    for start, end in intervals[1:]:
        if start <= res[-1][1]:
            res[-1][1] = max(res[-1][1], end)
        else:
            res.append([start, end])

    return res
```

---

# 21. Top K Frequent Elements

## Solution

```python id="yr9mxp"
from collections import Counter

def topKFrequent(nums, k):
    count = Counter(nums)
    return [x for x, _ in count.most_common(k)]
```

---

# 22. Kth Largest Element

## Solution

```python id="dbes8n"
import heapq

def findKthLargest(nums, k):
    return heapq.nlargest(k, nums)[-1]
```

---

# 23. Implement Queue using Stack

## Solution

```python id="a2k5f8"
class MyQueue:
    def __init__(self):
        self.s1 = []
        self.s2 = []

    def push(self, x):
        self.s1.append(x)

    def pop(self):
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())

        return self.s2.pop()
```

---

# 24. Implement Stack using Queue

## Solution

```python id="w0xxrt"
from collections import deque

class MyStack:
    def __init__(self):
        self.q = deque()

    def push(self, x):
        self.q.append(x)

        for _ in range(len(self.q)-1):
            self.q.append(self.q.popleft())

    def pop(self):
        return self.q.popleft()
```

---

# 25. Min Stack

## Solution

```python id="n2u2hr"
class MinStack:
    def __init__(self):
        self.stack = []
        self.minStack = []

    def push(self, val):
        self.stack.append(val)

        if not self.minStack or val <= self.minStack[-1]:
            self.minStack.append(val)

    def pop(self):
        if self.stack.pop() == self.minStack[-1]:
            self.minStack.pop()

    def getMin(self):
        return self.minStack[-1]
```

---

# 26. Depth First Search (DFS)

## Solution

```python id="n5khl5"
def dfs(graph, node, visited):
    visited.add(node)

    for nei in graph[node]:
        if nei not in visited:
            dfs(graph, nei, visited)
```

---

# 27. Breadth First Search (BFS)

## Solution

```python id="n5b3y9"
from collections import deque

def bfs(graph, start):
    q = deque([start])
    visited = set([start])

    while q:
        node = q.popleft()

        for nei in graph[node]:
            if nei not in visited:
                visited.add(nei)
                q.append(nei)
```

---

# 28. Number of Islands

## Pattern

DFS on grid.

---

# 29. Flood Fill

## Pattern

DFS/BFS traversal.

---

# 30. Invert Binary Tree

## Solution

```python id="7fbg3d"
def invertTree(root):
    if not root:
        return None

    root.left, root.right = root.right, root.left

    invertTree(root.left)
    invertTree(root.right)

    return root
```

---

# 31. Maximum Depth of Binary Tree

## Solution

```python id="mn6hy2"
def maxDepth(root):
    if not root:
        return 0

    return 1 + max(maxDepth(root.left), maxDepth(root.right))
```

---

# 32. Same Tree

## Solution

```python id="iok1s8"
def isSameTree(p, q):
    if not p and not q:
        return True

    if not p or not q:
        return False

    return (
        p.val == q.val and
        isSameTree(p.left, q.left) and
        isSameTree(p.right, q.right)
    )
```

---

# 33. Balanced Binary Tree

## Pattern

DFS + height calculation.

---

# 34. Lowest Common Ancestor

## Pattern

Binary tree recursion.

---

# 35. Linked List Cycle

## Solution

```python id="thpjlwm"
def hasCycle(head):
    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            return True

    return False
```

---

# 36. Find Middle of Linked List

## Solution

```python id="3e5lh5"
def middleNode(head):
    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    return slow
```

---

# 37. Remove Duplicates from Sorted Array

## Solution

```python id="lmy32g"
def removeDuplicates(nums):
    if not nums:
        return 0

    k = 1

    for i in range(1, len(nums)):
        if nums[i] != nums[i-1]:
            nums[k] = nums[i]
            k += 1

    return k
```

---

# 38. Merge Sorted Arrays

## Solution

```python id="f9u2hx"
def merge(nums1, m, nums2, n):
    i, j, k = m-1, n-1, m+n-1

    while j >= 0:
        if i >= 0 and nums1[i] > nums2[j]:
            nums1[k] = nums1[i]
            i -= 1
        else:
            nums1[k] = nums2[j]
            j -= 1

        k -= 1
```

---

# 39. Longest Common Prefix

## Solution

```python id="j3y6u7"
def longestCommonPrefix(strs):
    prefix = strs[0]

    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]

    return prefix
```

---

# 40. Roman to Integer

## Pattern

Hashmap parsing.

---

# 41. Happy Number

## Pattern

HashSet cycle detection.

---

# 42. Intersection of Two Arrays

## Solution

```python id="0yct7x"
def intersection(nums1, nums2):
    return list(set(nums1) & set(nums2))
```

---

# 43. Group Anagrams

## Solution

```python id="cx64hr"
from collections import defaultdict

def groupAnagrams(strs):
    mp = defaultdict(list)

    for s in strs:
        key = ''.join(sorted(s))
        mp[key].append(s)

    return list(mp.values())
```

---

# 44. Subarray Sum Equals K

## Pattern

Prefix sum + hashmap.

---

# 45. Daily Temperatures

## Pattern

Monotonic stack.

---

# 46. Sliding Window Maximum

## Pattern

Deque + sliding window.

---

# 47. Search in Rotated Sorted Array

## Pattern

Modified binary search.

---

# 48. Find Duplicate Number

## Pattern

Floyd cycle detection.

---

# 49. Course Schedule

## Pattern

Topological sort.

---

# 50. LRU Cache

## Pattern

Hashmap + doubly linked list.

---

# MOST IMPORTANT PATTERNS TO MASTER

---

# 1. HashMap

Questions:

* Two Sum
* Anagram
* Top K

---

# 2. Sliding Window

Questions:

* Longest substring
* Max sum subarray

---

# 3. Two Pointers

Questions:

* Sorted arrays
* Palindrome

---

# 4. Stack

Questions:

* Parentheses
* Monotonic stack

---

# 5. Heap

Questions:

* Kth largest
* Top K frequent

---

# 6. DFS/BFS

Questions:

* Graph traversal
* Islands
* Trees

---

# 7. Binary Search

Questions:

* Rotated array
* Search insert

---

# MOST IMPORTANT FOR BACKEND INTERVIEWS

Practice these first:

1. Two Sum
2. Valid Parentheses
3. LRU Cache
4. Top K Frequent
5. Sliding Window
6. BFS/DFS
7. Merge Intervals
8. Binary Search
9. Linked List Cycle
10. Kth Largest Element
