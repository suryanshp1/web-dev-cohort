function add(a, b) {
    return a+b
}

function sub(a, b) {
    if (!a>b) throw new Error('number a must be greated than b');
    
    return a-b
}

x = add(2,3)
print(x)
add(10,33)
add(13,5)


sub(10, 3)
