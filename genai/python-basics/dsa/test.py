def longest_bitonic_subsequence(arr):
    n = len(arr)

    # Step 1: Increasing
    lis = [1] * n
    for i in range(n):
        for j in range(i):
            if arr[j] < arr[i]:
                lis[i] = max(lis[i], lis[j] + 1)

    # Step 2: Decreasing
    lds = [1] * n
    for i in range(n - 1, -1, -1):
        for j in range(n - 1, i, -1):
            if arr[j] < arr[i]:
                lds[i] = max(lds[i], lds[j] + 1)

    # Step 3: Combine
    max_length = 0
    for i in range(n):
        max_length = max(max_length, lis[i] + lds[i] - 1)

    return max_length

# Example
arr = [1, 11, 2, 10, 4, 5, 2, 1]
print(longest_bitonic_subsequence(arr))