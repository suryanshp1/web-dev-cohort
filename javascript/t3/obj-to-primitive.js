// Conversion -> Number, String
// Obj[Symbol.toPrimitive](hint)
// hint -> string, number, default

let galgotia = {
    status: "wasted",
    aura: -1000,

    // custom conversion
    [Symbol.toPrimitive](hint) {
        if (hint === "string") {
            return this.status
        }

        return this.aura;
    }
}

console.log(galgotia)
console.log(Number(galgotia))
console.log(String(galgotia))
