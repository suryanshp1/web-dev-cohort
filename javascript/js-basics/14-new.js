// Create a new object
// Link that empty object to variable
// Bound `this` to new object or transferring the properties
// Explicit return

// Works on both function and class


function TataCar(chasisNumber, modelName) {
    this.chasisNumber = chasisNumber
    this.modelName = modelName
    this.fuelLevel = 100
}

TataCar.prototype.status = function () {
    return `Tata ${this.modelName} #${this.chasisNumber} Fuel: ${this.fuelLevel}`
}

// const car1 = new TataCar("MH-101", "Nexon")
// const car2 = new TataCar("DL-103", "Nano")

// console.log(car1.status())
// console.log(car2.status())


// this is not same as above
// factory functions
// Expensive to run - Every instance have whole reference - more memory

function createAutoRickshaw(id, route) {
    return {
        id,
        route,
        run () {
            return `Auto ${id} running on route ${route}`
        }
    }
}

const auto1 = createAutoRickshaw("UP-1", "Lucknow-Kanpur")
const auto2 = createAutoRickshaw("UP-5", "Agra-Mathura")

console.log(auto1.run())
console.log(auto2.run())