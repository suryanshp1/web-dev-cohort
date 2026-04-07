// Union type

let subs: number | string = '1M'

let apiRequestStatus: "pending" | "success" | "failure" = "pending"

apiRequestStatus = "success"

let airlineSeat: 'aisle' | 'window' | 'middle' = 'middle'

airlineSeat = 'aisle'


// Any - Bypass or when type is not necessory - avoid it in all case
const orders = ['12', '20', '28', '42']

let currentOrder: string | undefined;
for(let order in orders) {
    if (order === '28') {
        currentOrder = order
        break
    }
}

console.log(currentOrder)