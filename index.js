function add(a, b) {
    return a+b
}

function sub(a, b) {
    if (!a>b) throw new Error('number a must be greated than b');
    
    return a-b
}

function multiply(a,b) {
    if (a<0 || b<0) throw new Error('No negatives allowed')
    return a*b
}

x = add(2,3)
print(x)
add(10,33)
add(13,5)


sub(10, 3)

multiply(2, 3)

multiply(20, 33)

multiply(45, 31)
