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

prepareOrder("Chai")
    .then(order => pickUpOrderCB(order))
    .then(order => deliverOrder(order))
    .catch()