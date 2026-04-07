// type inferencing - automaticlly finds the type of variable

let drink = "chai" // drink: string

let cups = Math.random() > 0.5 ? 10 : '5' // cups: string | number

// type errors

let channelName = "Test"
// channelName = 22 // will throw error as firstly it was declared string

// type annotation - When dev annotate or declare type of variable

let chaiFlavour: string = "Masala Chai"
chaiFlavour = "Ginger tea"

let chaiOrder: number | string
let isOrdered: boolean