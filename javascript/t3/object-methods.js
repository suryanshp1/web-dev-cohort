// // method 1

// const dogesh = {
//     name: "Hushky",
// }

// dogesh.dance = function () {
//     console.log("Ichu Ichu song")
// }

// // method 2
// function viralDance() {
//     console.log("Ichu Ichu song")
// }

// const dogesh = {
//     name: "Hushky",
//     dance: viralDance,
// }

// // method 3
// const dogesh = {
//     name: "Hushky",
//     dance: function () {
//         console.log("Ichu Ichu song")
//     },
// }

// // method 4 - method shorthand
// const dogesh = {
//     name: "Hushky",
//     dance () {
//         console.log("Ichu Ichu song")
//     },
// }

let user = {
    name: "Piyush Garg",
    age: 26,
    college: "Chitkara University",
    passout: 2021,
    gf: "Mai ki ladli",

    intro() {
        console.log(`name: ${this.name}`);
        console.log(`age: ${this.age}`);
        console.log(`college: ${this.college}`);
        console.log(`passout: ${this.passout}`);
        console.log(`gf: ${this.gf}`);
    }
}

// user.intro()

let piyush = user;
user = null;

// piyush.intro()
