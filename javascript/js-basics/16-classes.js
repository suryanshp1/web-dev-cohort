class Cricketer {
    constructor(name, role) {
        this.name = name
        this.role = role
        this.mathesPlayed = 0
        this.stamina = 100
    }

    introduce() {
        return `${this.name} the ${this.role} | matches played : ${this.mathesPlayed} | stamin : ${this.stamina}`
    }
}

const player1 = new Cricketer("Virat", "Batsman")
const player2 = new Cricketer("Bumrah", "Bowler")

// console.log(player1.hasOwnProperty("name")) // true
// console.log(typeof Cricketer) // function

class Debutant {
    constructor(name) {
        this.name = name
        this.walkOut = () => `${this.name} walks out to bat for first time`
    }
}

const debutant1 = new Debutant("Shubham")
const somethingFromLastClass = debutant1.walkOut

const debutant2 = new Debutant("Yashashvi")

console.log(debutant1.walkOut === debutant2.walkOut) // false - seperate reference with shared memory
console.log(somethingFromLastClass())