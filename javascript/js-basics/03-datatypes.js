// const weaponName = "Flame Sword"
// console.log("Weapon: ", weaponName, " | type : ", typeof(weaponName))

// const attackPower = 75
// const attackUpgrade = 1.5
// const health = 1233n

// console.log(typeof attackPower)
// console.log(typeof attackUpgrade)
// console.log(typeof health)

// const isLoggedIn = true
// console.log(typeof isLoggedIn)

// let bonusEffect
// console.log(typeof bonusEffect)

// let curseEffect = null
// console.log(typeof curseEffect)

// const uniqueRuneId = Symbol("rune_of_fire") // unique address + immutatble
// console.log("Rune : ", uniqueRuneId.toString(), "type: ", typeof uniqueRuneId); // use toString to avoid prod issue

// const heroStats = {
//     name: "Surya",
//     level: 11,
//     class: "Ranger",
// }

// console.log("Hero: ", heroStats, "type: ", typeof heroStats)

// const inventory = ["Flame Sword", "Health Potion", "Shield"]
// console.log("inventory: ", inventory, "type: ", typeof inventory)

// function castSpell() {
//     return "Fireball"
// }
// console.log("castSpell: ", castSpell, "type: ", typeof castSpell)

// console.log(typeof "chaicode")
// console.log(typeof 42)
// console.log(typeof 42n)
// console.log(typeof true)
// console.log(typeof undefined)
// console.log(typeof null)
// console.log(typeof Symbol())
// console.log(typeof {})
// console.log(typeof [])
// console.log(typeof function () {})


// Copy value

// let originalHP = 100;
// let cloneHP = originalHP;

// cloneHP = 80;

// console.log("originalHP value : ", originalHP);
// console.log("cloneHP value : ", cloneHP);

// Object reusability - warning

// wrong way - shallow copy/clone
// const originalSword = {
//     name: "Flame Sword",
//     damage: 45,
//     typeOfW: "fire",
// }

// const cloneSword = originalSword
// cloneSword.damage = 100

// console.log("originalSword damage value : ", originalSword.damage); // originalSword damage changed
// console.log("cloneSword damage value : ", cloneSword.damage);

// right way - deep copy/clone
// armorOriginal = {
//     name: "Iron Shield",
//     defence: 80,
//     buff: {
//         fire: 10,
//     },
// };

// const armorCopy = {...armorOriginal} // spread operator to copy but it will not work for nested objects
// const armorCopy = structuredClone(armorOriginal)

// armorCopy.buff.fire = 90

// console.log("armorOriginal fire value : ", armorOriginal.buff.fire);
// console.log("armorCopy fire value : ", armorCopy.buff.fire);

// console.log(typeof null === "object")
// console.log(Array.isArray())

