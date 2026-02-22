
// console.log(brewPotion("Healing Herb", 3))

function brewPotion(ingredient, dose) {
    return `Brewing potion with ${ingredient}. (x${dose})....Potion ready`
}


const mixElixir = function (ingredient) {
    return `Mixing elixir with ${ingredient}.....`
}


// no own this, no `arguments` object
const distilEssence = (ingredient) => {
    return `Mixing elixir with ${ingredient}.....`
}

// function oldBrewingLogs() {
//     console.log("Type: ", typeof arguments)
//     console.log("Is Array : ", Array.isArray(arguments))
//     const argumentArray = Array.from(arguments)
//     console.log(argumentArray)
// }

// oldBrewingLogs("Sage", "Rosemary")

// const arrowBrew = () => {
//     try {
//         console.log(arguments)
//     } catch (e) {
//         // console.log(e)
//         console.log(e.message)
//     }
// }

// arrowBrew()
// console.log("Program continue")

// Impure function : A function which depends on outer state or variable is called impure function
let globalCount = 0
function brewCount(name) {
    globalCount++
}

// HOF - Higher Order Function - the function which take another function reference as argument or returning a function as argument
// map, filter, reduce is also example of HOF

function anotherFuncForClass(brewCount) {
    return function newBrew() {
        // do something
        console.log("hello")
    }
}

// IIFE - Immediately Invoked Function Expression - ()()

// const postionShop = (function () {
//     console.log("Welcome to shop")
//     let inventory = 0; // you can not access it outside

//     return {
//         brew () {
//             inventory++
//             return `Brew postion #${inventory}`
//         },
//         getStock() {
//             return inventory;
//         }
//     }
// })()
// console.log(postionShop)
// console.log(typeof postionShop)
// console.log(postionShop.brew())
// console.log(postionShop.getStock())
// console.log(postionShop.inventory) // undefined

// (function () {console.log("NORMAL")})()
// (() => {console.log("ARROW")})()

// Closure

function makeFunc () {
    const name = "Mozilla";
    function displayName() {
        console.log(name)
    }
    return displayName;
}

const myFunc = makeFunc();
myFunc()