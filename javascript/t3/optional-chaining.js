const user = {
    name: "John",
    email: "john@gmail.com",
    address: {
        full: "add, city",
        // city: "London",
        zip: "432432",
    }
}


// if (user.address) {
//     if (user.address.city){
//         console.log(user.address.city)
//     } else {
//         console.log(user.address.full)
//     }
// } else {
//     console.log("Empty")
// }

// console.log(user.address && user.address.city)


// optional chaining - .?
// Whwn to add ? -> when we are not sure
console.log(user.address?.city)