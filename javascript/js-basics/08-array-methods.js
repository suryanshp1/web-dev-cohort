const orders = [
    {dish: "Pizza", price: 14, spicy: false, qty: 2},
    {dish: "Curd Rice", price: 12, spicy: true, qty: 1},
    {dish: "Idli", price: 9, spicy: false, qty: 3},
    {dish: "Dosa", price: 11, spicy: true, qty: 2},
    {dish: "Pesarratu", price: 18, spicy: false, qty: 1},
];

// const myData = orders.forEach((order, index) => {
//     console.log(`.   #${index + 1}  : ${order.qty} x ${order.dish}`)
// })
// console.log(myData)

// res = orders.map(o => `${o.dish} : $${o.price * o.qty}`)
// console.log(res)

// spicyOrders = orders.filter(o => o.spicy)
// console.log(spicyOrders)

// const totalRevenue = orders.reduce((sum, order) => {
//     return sum + (order.qty * order.price);
// }, 0)
// console.log(totalRevenue)

// const grouped = orders.reduce((acc, order) => {
//     const category = order.spicy ? "spicy" : "mild";

//     acc[category].push(order.dish)
//     return acc

// }, {spicy: [], mild: []})
// console.log(grouped)

// const ticketNumbers = [23, 45, 21, 12, 4, 9]
// const sortedTic = [...ticketNumbers].sort((a,b) => a-b)
// console.log(sortedTic)

const mildReport = orders
    .filter(order => !order.spicy)
    .map(
        order => ({
            dish: order.dish,
            total: order.price * order.qty,
        })
    )
    .toSorted((a, b) => a - b)

console.log(mildReport)