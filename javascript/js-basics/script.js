function createOptimizedVersion(fn) {
    const cache = {} // Tiffin

    return function (...args) {
        const key = JSON.stringify()
        if (cache[key]) {
            return cache[key];
        }

        const result = fn(...args)
        cache[key] = result
        return result
    }
    
}

function add(a, b) {
    const result = a+b;
    return result;
}

console.log(add(3,4))


function square(n) {
    return n*n
}

console.log(square(3))

const optimizedAdd = createOptimizedVersion(add)
const optimizedSquare = createOptimizedVersion(square)

// optimizedAdd(2,3)

// console.time("StartCode")
// square(100)
// console.timeEnd("StartCode")
// console.time("StartCode")
// square(100)
// console.timeEnd("StartCode")
// console.time("StartCode")
// square(100)
// console.timeEnd("StartCode")
// console.time("StartCode")
// square(100)
// console.timeEnd("StartCode")
// console.time("StartCode")
// square(100)
// console.timeEnd("StartCode")
// console.time("StartCode")
// square(100)
// console.timeEnd("StartCode")

console.time("StartCode")
optimizedSquare(100)
console.timeEnd("StartCode")
console.time("StartCode")
optimizedSquare(100)
console.timeEnd("StartCode")
console.time("StartCode")
optimizedSquare(100)
console.timeEnd("StartCode")
console.time("StartCode")
optimizedSquare(100)
console.timeEnd("StartCode")
console.time("StartCode")
optimizedSquare(100)
console.timeEnd("StartCode")
console.time("StartCode")
optimizedSquare(100)
console.timeEnd("StartCode")