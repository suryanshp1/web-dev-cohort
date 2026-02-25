// console.log(this)
// console.log(typeof this) // object

// function ranveerOnGlobalStage() {
//     return typeof this; // object
// }

// console.log(ranveerOnGlobalStage())

// function ranveerWithNoScript() {
//     // "use strict"

//     return this;
// }

// console.log(ranveerWithNoScript())

const bollywoodFilm = {
    name: "Bajirao Mastani",
    lead: "Ranveer",

    introduce() {
        return `name: ${this.name} lead: ${this.lead}`
    }
}


// console.log(bollywoodFilm.introduce())

const filmDirector = {
    name: ["Sanjay Leela Bhanshali"],
    cast: ["Ranveeer", "Deepika", "Priyanka"],

    announeCast() {
        this.cast.forEach((actor) => {
            console.log(`${this.name} introduces ${actor}`)
        })
    }
}

// filmDirector.announeCast()


// A regular nested function does not inherit this
const filmSet = {
    crew: "Spot Boys",
    prepareProps() {
        console.log(`Outer this.crew: ${this.crew}`)

        function arrangeChairs() {
            console.log(`Inner this.crew: ${this.crew}`)
        }
        arrangeChairs();

        const arrangLights = () => {
            console.log(`Arrow this.crew: ${this.crew}`)
        }

        arrangLights()
    }
}

// filmSet.prepareProps()

// detached methods - this reference not work

const actor = {
    name : "Ranveer",
    bow() {
        return `${this.name} returned bow`
    }
}

const detachedBow = actor.bow

console.log(detachedBow())
