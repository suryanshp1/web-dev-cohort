const carriage1 = ["Sumit", "Ravi", "Surya"]
const emptyCarriage = []

const threeEmptySeats = Array(3)
// console.log(threeEmptySeats)
// console.log(threeEmptySeats.length)

const passanger = Array("Veer", "Ayush", "Ravi")
const singlePassanger = Array.of("Sam")
// console.log(singlePassanger)

const trainCode = Array.from("DUST")
// console.log(trainCode)

const tempTrain = [ 'D', 'U', 'S', 'T' ]

// MUTATION
// tempTrain.length = 2
// console.log(tempTrain)
// tempTrain.length = 4
// console.log(tempTrain)

// tempTrain.push("A")
// console.log(tempTrain)
// tempTrain.pop()
// console.log(tempTrain)

// tempTrain.shift()
// console.log(tempTrain)
// tempTrain.unshift("A")
// console.log(tempTrain)
// tempTrain.splice(0, 2)
// console.log(tempTrain)

// Non - MUtate - concat, slice, flat - check MDN docs for more info

// copy data
// trainCopy = tempTrain.slice()

// Searching: indexOf, includes, find , findIndex

console.log(typeof [])
console.log(Array.isArray([]))
console.log(Array.isArray("abc"))