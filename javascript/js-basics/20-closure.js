// function init() {
//     let name = "Mozilla";
//     function displayName() {
//         console.log(name)
//     }
//     displayName();
// }

// init();


// function makeFunc() {
//     const name = "Mozilla";
//     function displayName() {
//         console.log(name)
//     }

//     return displayName
// }

// const myFunc = makeFunc()
// myFunc();

function startCompany() {
    function ca(name) {
        return `Name of your company is ${name}`
    }

    return ca
}

const getMeACompany = startCompany()
const myCompanyName = getMeACompany("Zomato")

// console.log(myCompanyName)

const cups = ["green", "blue", "red"]

cups.map()