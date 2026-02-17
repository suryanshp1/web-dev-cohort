const codeName = "Shadow Fox"
const backupName = String("Night Howl")
const templateName = `Agent ${codeName}` // string interpolation

let intercepted = "Hello"
intercepted[0] = "j" // immutatble - no error, but silent fail
// console.log(intercepted)

const secretCode = "OMEGA-7"

// console.log(secretCode.length)
// console.log(secretCode.charAt(0))
// console.log(secretCode.at(-1))
// console.log(secretCode.charAt(99)) // empty string for out of index
// console.log(secretCode[99]) // undefined  for out of index

// const rawTransmission = "THe EAgle has LandeD"
// console.log(rawTransmission.toUpperCase())
// console.log(rawTransmission.toLowerCase())

// const message = "The drop point is at Dock 7. Reapeat: Dock 7"
// console.log(message.indexOf("Dock"))
// console.log(message.lastIndexOf("Dock"))
// console.log(message.includes("Dock"))
// console.log(message.substring(1, 5))
// console.log(message.slice(2, 5))

// const orders = "   go-straight|take-left|ride-car|jump  "
// splittedOrder = orders.trim().split("|")
// console.log("Split : ", splittedOrder)
// joinedOrder = splittedOrder.join("|")
// console.log("Joined : ", joinedOrder)

// console.log("SOS".split()) // [ 'SOS' ]
// const myVal = "SOS".split("")
// console.log(myVal) // [ 'S', 'O', 'S' ]
// console.log(typeof myVal) // object
// console.log(Array.isArray(myVal)) // true


// Padding

// const missionNumber = '42'
// console.log(missionNumber.padStart(6, "_")) // ____42

// const spellCard = `
// +========================================================+
// |                                                        |
// |               Template : ${templateName}               |
// |                                                        |
// +========================================================+
// `
// console.log(spellCard)

// const profile = `
// ${2>3?22:33}
// `
// console.log(profile)

// console.log(void "xyzß") // undefined

let generalStore = {
    name: "Kirana",
    goods: 2,
}
// console.log(generalStore)
// generalStore = undefined
// console.log(generalStore)
// generalStore = null
// console.log(generalStore)
