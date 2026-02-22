const { cloneElement } = require("react")

const hero = {
    name: "Luna The Brave",
    class: "Mage",
    level: 12,
    helath: 85,
    mana: 120,
    isAlive: true,
}

// hero["weapon"] = "fire"
hero.weapon = "fire"
delete hero.level

const ranger = {
    name: "Lucky The racer",
    agility: 80,
    stealth: undefined,
}

// console.log("name" in ranger). //true
// console.log("stealth" in ranger). //true
// console.log("toString" in ranger). //true

// console.log(ranger.hasOwnProperty("toString")) // false