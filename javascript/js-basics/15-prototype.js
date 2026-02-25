// most important use of prototype in inheritance

const prithviraj = {
    name: "prithviraj",
    generation: "Grandfather",
    cookTraditionalDish() {
        return `${this.name} cooks an ancient family recipe`;
    }
};

const raj = Object.create(prithviraj)

raj.name = "Raj"
raj.generation = "Father"
raj.runBusiness = function () {
    return `${this.name} runs family business`
}
// console.log(raj)
// console.log(raj.name)
// console.log(raj.cookTraditionalDish())

const ranbir = Object.create(raj)
ranbir.name = "ranbir"
ranbir.generation = "son"
ranbir.makeFilm = function () {
    return `${this.name} directs blockbuster movies`
}

// console.log(ranbir.makeFilm())
// console.log(ranbir.runBusiness())
// console.log(ranbir.cookTraditionalDish())
// console.log(Object.hasOwn(ranbir, "makFilm"))

// const myName = "Surya"
// console.log(myName.__proto__)

// Adding custom property in Array prototype object - polyfill
// Polyfill : A piece of code used to provide modern functionality to old browsers
Array.prototype.last = function () {
    return this[this.length - 1]
}
console.log([1,2,3].last()) // 3

Array.prototype.surya = "surya"
console.log([1,2,3].surya) // surya

// Implement your own map, forEah, Reduce using polyfill