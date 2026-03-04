// JS spec says
// Objects keys -> String, Symbol

// Symbol is a primitive unique value with the optional description

let baby = Symbol("Mai kya ladle");

// Symbols are always unique even if the description is same

// console.log(Symbol("ak") === Symbol("ak")) // false

// Use case - Hidden Property - Skip by for...in loops

// Global Symbol
// they exist in global symbol registry
// Instead of description we call it key in this case

let org = Symbol.for("ChaiCode");

let company = Symbol.for("ChaiCode");

// console.log(org === company) // true
// console.log(Symbol.keyFor(org)) // ChaiCode

// System Symbols
// Symbol.iterator
// Symbol.toPrimitive