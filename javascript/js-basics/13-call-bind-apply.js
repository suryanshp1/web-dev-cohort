// call and apply -> basic chef (Kitchen)
// bind -> returns a new function



function cookDish(ingredient, style) {
    return `${this.name} prepares ${ingredient} in ${style} style`
}

const sharmaKitchen = {
    name: "Sharma Ji's Kitchen"
}

const guptaKitchen = {
    name: "Gupta Ji's Kitchen"
}

// console.log(cookDish.call(sharmaKitchen, "Paneer and spices", "Paneer"))

const guptaOrder = ["Chole Kulche", "Punjabi Dhaba"]

// console.log(cookDish.apply(guptaKitchen, guptaOrder))

// Assign
// bills = [100, 30, 50, 40]
// console.log(Math.max.apply(null, bills))
// console.log(Math.max(...bills))


function reportDelivery(location, status) {
    return `${this.name} at ${location}: ${status}`;
}

const deliveryBoy = {name: "Ranveer"}

console.log("Call: ", reportDelivery.call(deliveryBoy, "Lyari", "Ordered"))

console.log("Apply: ", reportDelivery.apply(deliveryBoy, ["Mars", "PickedUp"]))

// console.log("Bind: ", reportDelivery.bind(deliveryBoy, "Haridwar", "WHAT"))

// const bindReport = reportDelivery.bind(deliveryBoy, "Haridwar", "WHAT")
// console.log(bindReport())

// const bindReport = reportDelivery.bind(deliveryBoy, "Haridwar")
// console.log(bindReport("WHAT"))

const bindReport = reportDelivery.bind(deliveryBoy)
console.log(bindReport("Haridwar", "WHAT"))