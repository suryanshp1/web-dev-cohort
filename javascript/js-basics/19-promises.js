function prepareOrderCB(dish, cb) {
    setTimeout(() => cb(null, { dish, status: "prepared" }), 100)
}

function pickUpOrderCB(order, cb) {
    setTimeout(() => cb(null, { ...order, status: "picked-up" }), 100)
}

function deliverOrderCB(order, cb) {
    setTimeout(() => cb(null, { ...order, status: "delivered" }), 100)
}

// prepareOrderCB("Biryani", (err, order) => {
//     if (err) return console.log(err)
//     pickUpOrderCB(order, (err, order) => {
//         if (err) return console.log(err)
//         deliverOrderCB(order, (err, order) => {
//             if (err) return console.log(err)
//             console.log(`${order.dish}: ${order.status}`)
//         })
//     })
// })


// Promise status - pending, fulfilled, rejected

function prepareOrder(dish) {
    return new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                if (!dish) {
                    reject(new Error("no dish is there"));
                    return
                }
                console.log(`${dish} is ready`)
                resolve({dish, status: "prepared"})
            }, 100)
        }
    )
}

function pickupOrder(order) {
    return new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                if (!order) {
                    reject(new Error("no order is there"));
                    return
                }
                console.log(`${order} is ready`)
                resolve({order, status: "pickedup"})
            }, 100)
        }
    )
}

function deliverOrder(order) {
    return new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                if (!order) {
                    reject(new Error("no order is there"));
                    return
                }
                console.log(`${order} is ready`)
                resolve({...order, status: "delivered"})
            }, 100)
        }
    )
}

// prepareOrder("Chai")
//     .then(order => pickUpOrderCB(order))
//     .then(order => deliverOrder(order))
//     .catch()


// Promises : pending, done(fulfil, resolve), nope(not, rejected, nako)

// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve("Chaicode")
//         reject(new Error("Chaicode error"))
//     }, 2000)
// })
// console.log(promise)

// setTimeout(() => {
//     console.log(promise)
// }, 3000)

// promise.then((value) => {
//     console.log(value)
// })

// promise.then(console.log)

// promise.then(
//     (data) => console.log(data),
//     (error) => console.log(error),
// )

// promise.then((data) => {
//         newData = data.toUpperCase();
//         return newData   
//     })
//     .then((data) => {
//         return data + ".com"
//     })
//     .then(console.log)
//     .catch((error) => {
//         console.log(error)
//         return "Chai"
//     })
//     .then(console.log)

const turant = Promise.resolve("Turant")
// console.log(turant)


// const allPromise = Promise.any([
//     Promise.resolve("Chai"),
//     Promise.resolve("Code"),
//     Promise.resolve("Error"),
// ])

// const allPromise = Promise.all([
//     Promise.resolve("Chai"),
//     Promise.resolve("Code"),
//     Promise.resolve("Error"),
// ])

// const allPromise = Promise.allSettled([
//     Promise.resolve("Chai"),
//     Promise.resolve("Code"),
//     Promise.resolve("Error"),
// ])

// allPromise.then(console.log)

// const hpromise = new Promise((res, rej) => {
//     setTimeout(() => {
//         // res("Masterji")
//         rej(new Error("Masterji error"))
//     }, 3000)
// })

// async function nice() {
//     try {
//         const result = await hpromise;
//         console.log(result)
//     } catch (err) {
//         console.log(`Something went wrong | ${err.message}`)
//     }
    
// }

// nice();

// const newRes = await hpromise
// console.log(newRes)

console.log("Swastik")
Promise.resolve("resolved value").then((v) => {
    console.log("Microtask", v);
})
console.log("Surya!!")