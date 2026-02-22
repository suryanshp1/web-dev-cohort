const artifact = {
    name: "Crown",
    era: "Ancient",
    value: 50000,
    material: "Volcanic Glass",
}

const keys = Object.keys(artifact)
const values = Object.values(artifact)
const entries = Object.entries(artifact)

// console.log(keys)
// console.log(values)
// console.log(entries)

// for (const [key, value] of Object.entries(artifact)) {
//     console.log(`   ${key}: ${value}`)
// }

// priceList = [
//   [ 'Crown', 50000 ],
//   [ 'Sword', 25000 ],
//   [ 'Sofa', 20000 ],
//   [ 'Carpet', 10000 ]
// ]
// priceObject = Object.fromEntries(priceList)
// console.log(priceObject)

// const displayCase = {
//     artifact: "Obsidian",
//     location: "Hall A, Case 3",
//     locked: true,
// }
// Object.freeze(displayCase)
// delete displayCase.locked
// displayCase.newProp = "test"
// console.log(displayCase)

// const catelogCategory = {
//     id: "ART-001",
//     description: "Ancient Crows",
//     verified: true,
// }

// Object.seal(catelogCategory)
// catelogCategory.verified = false
// catelogCategory.newProp = "abc"
// console.log(catelogCategory)

const secureArtifacts = {
    name: "Ruby Pendant"
}
Object.defineProperty(secureArtifacts, "catelogId", {
    value: "SEC-999",
    writable: false, // is editable
    enumerable: false, // is loopable
    configurable: false, // is delete or undefine
})

// console.log(secureArtifacts.catelogId) // SEC-999
// secureArtifacts.catelogId = "HACKED"
// console.log(secureArtifacts.catelogId) // SEC-999

// for (const [key, value] of Object.entries(secureArtifacts)) {
//     console.log(`   ${key}: ${value}`)
// }

// const desc = Object.getOwnPropertyDescriptor(secureArtifacts, "catelogId")
// console.log(desc)

// const Namedesc = Object.getOwnPropertyDescriptor(secureArtifacts, "name")
// console.log(Namedesc)


// loop key points
// 1. for loop - most optimized
// 2. while loop - run until condition met
// 3. do-while loop - it will once for sure
// 4. for...in -> Avoid in array
// 5. for...of
// 6. map
// 7. foreach(no await/break in foreach), filter, reduce, every