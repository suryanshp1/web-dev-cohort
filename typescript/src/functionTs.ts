function makeChai(type: string, cups: number) {
    console.log(`Making ${cups} cups of ${type} chai`);
    
}

makeChai("Masala", 3)

function getChaiPrice(): number {
    return 25
}

function makeOrder(order: string): null | string {
    if (!order) return null

    return order
}

function logChai(): void {
    console.log("Chai is ready")
}

// optional and default parameter

// function orderChai(type?: string) {
//     //
// }

function orderChai(type: string = "Masala") {
    return type
}

function createChai(order: {type: string; sugar: number; size: "small" | "larger"}):number {
    return 3
}