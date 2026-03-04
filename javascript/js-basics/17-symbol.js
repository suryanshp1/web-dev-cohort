// Symbol -> Unique Identifier

const aadhar_of_mayur = Symbol("aadhar")
const aadhar_of_piyush = Symbol("aadhar")

console.log(typeof aadhar_of_mayur)

// console.log(aadhar_of_mayur)
// console.log(aadhar_of_mayur)

// console.log(aadhar_of_piyush.toString())
// console.log(aadhar_of_piyush.description)

// console.log(aadhar_of_piyush===aadhar_of_mayur)
// console.log(aadhar_of_piyush==aadhar_of_mayur)

const non_indian = Symbol()
// console.log(non_indian.description) //undefined

const biometricHash = Symbol("biometricHash")
const bloodGroup = Symbol("bloodGroup")

const citizenRecord = {
    name: "Ved Pandey",
    age: 31,
    [biometricHash]: "a33bdh3h4hhdhd22",
    [bloodGroup]: "O+"
}

// Symbol as keys are not visible properties
console.log(Object.keys(citizenRecord)) // [ 'name', 'age' ]

console.log(Object.getOwnPropertySymbols(citizenRecord)) // [ Symbol(biometricHash), Symbol(bloodGroup) ]

const rtiQueryBook = {
    queries: [
        "Infra Budget", "Ration Card", "Education Budget", "Startup Laws"
    ],
    [Symbol.iterator]() {
        let index = 0;
        const queries = this.queries
        return {
            next() {
                if (index < queries.length) {
                    return {value: queries[index++], done: false}
                }
                return {value: undefined, done: true}
            }
        }
    }
}

// for (const query of rtiQueryBook) {
//     console.log(`Filing RTI : ${query}`)
// }


const governmentScheme = {
    name: "PM Kishan Yojna",
    people: 54,
    [Symbol.toPrimitive](hint){
        if (hint === "string") {
            return this.name
        }

        if (hint === "number") {
            return 88
        }
    }
}

console.log(+governmentScheme)
console.log(`${governmentScheme}`)