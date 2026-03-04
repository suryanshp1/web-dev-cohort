// Objects consists of properties, each property is key - value pair
// Everything in JS is object

const { version } = require("react");

// Two ways

let gemini = new Object(); // Object constructor syntax
let claude = {}; // Object literal

let gpt = {
    company: "openai",
    version: 5.2,
    releaseYear: 2025,
};

// console.log(gpt.company)

// Add new property
gpt.type = "LLM";
gpt.isMultiModel = true

//remove
delete gpt.type

// console.log(gpt)

let sonnet = {
    company: "anthropic",
    version: 4.6,
    "released on": 2026, // multiword property must be quoted
    1: "Hello",
}

// Trailing comma

// console.log(sonnet["released on"]) // square bracket notation
// console.log(sonnet.1) // will not work

// exp value as prop name
// const input = "company"
// console.log(sonnet[input])

// property shorthand
function getLaptop(name, price) { // params
    // console.log("Yu Hu");
    return {
        brand: "Apple",
        name,
        price,
    }
}

let myMac = getLaptop("M4 Air", 99_999); // args
// console.log(myMac)

// Search a property
// console.log(myMac.ram === undefined) // property not exists - true

// console.log("ram" in myMac) // false - as ram property not found in myMac

// Looping for...in

// for (key in myMac) {
//     console.log(key, myMac[key])
// }


// Objects are ordered in diffrent fashion

let codes = {
    // Asia
    "+7": "Russia",
    "+32": "Belgium",
    "+91": "India",

    // North America
    "+1": "Canada",
    "+52": "Mexico",
}

// console.log(codes)

// for (key in codes) {
//     console.log(key, codes[key])
// }

// Integer property are sorted, others appear in creation order

// Referencing and copying

// Primitives are always copied "as a value"

let like = "Radhika Das"
let love = like // "Radhika Das"

// console.log(love)

like = "Taylor Swift"
// console.log(love) // "Radhika Das"

// objects are stored and copied by reference
let artist = {
    name: "Radhika Das",
    country: "UK",
}

// console.log(artist)

let kirtaniya = artist;

kirtaniya.name = "Smita Das"

// console.log(artist)
// console.log(artist === kirtaniya)

// store by ref

let a = {};
let b = {};
// console.log(a===a) // true
// console.log(a===b) // false

// constants can't be modified then how we modify objects

const ev = {
    name: "Tesla",
}

ev.name = "BYD";
// console.log(ev.name) // BYD

// Why Clone ? - cause copy not possible

const original = {
    k1: "v1",
    k2: "v2",
}

let clone = {}

for (let key in original) {
    clone[key] = original[key];
}
// console.log(clone)

// Object.assign(dest, ...sources)

let clone1 = Object.assign({},original)
// console.log(clone1)

// nested obj
const nestedObj = {
    company: "openai",
    version: 5.2,
    releaseYear: 2025,
    capabilities: {
        reasioning: true,
        codeGeneration: true,
        imageUnderstanding: true,
        toolUse: true,
        functionCalling: true,
        streaming: true,
    }
};

// Deep Cloning

const nestedClone = structuredClone(nestedObj);
nestedClone.version = 1.0
console.log(nestedClone)