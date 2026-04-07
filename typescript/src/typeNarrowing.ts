function getChai(kind: string | number) {
    if (typeof kind === 'string') {
        return `Making ${kind} chai ...`
    }

    return `Chai Order : ${kind}`
}

// truthy value
function serveChai(msg?: string) {
    if (msg) {
        return `Serving ${msg} ...`
    }

    return `Serving default masala chai`
}

function orderChai(size: "small" | "medium" | "large" | number) {
    if (size === "small") {
        return `small cutting chai`
    }

    if (size === "medium" || size == "large") {
        return `make extra chai`
    }
}

class KulhadChai{
    serve() {
        return `Serving Kulhad Chai`
    }
}

class CuttingChai{
    serve() {
        return `Serving Cutting Chai`
    }
}

function serve(chai: KulhadChai | CuttingChai) {
    if (chai instanceof KulhadChai) {
        return chai.serve()
    }
}

type ChaiOrder = {
    type: string,
    sugar: number
}

function isChaiOrder(obj: any): obj is ChaiOrder {
    return (
        typeof obj === "object" && 
        obj !== null &&
        typeof obj.type === "string" &&
        typeof obj.sugar === "number"
    )
}

function serveOrder(item: ChaiOrder | string) {
    if (isChaiOrder(item)) {
        return `Serving ${item.type} chai with ${item.sugar} sugar`
    }

    return `Serving custom chai: ${item}`
}

type MasalaChai = {type: "masala"; spiceLevel: number };
type GingerChai = {type: "ginger"; spiceLevel: number };
type ElaichiChai = {type: "elaichi"; spiceLevel: number };

type Chai = MasalaChai | GingerChai | ElaichiChai

function MakeChai(order: Chai) {
    switch (order.type) {
        case "masala":
            return `Masala Chai`
            break;
        case "ginger":
            return `Ginger Chai`
            break;
        case "elaichi":
            return `Elaichi Chai`
            break;
        default:
            break;
    }
}


function brew(order: MasalaChai | GingerChai) {
    if ("spiceLevel" in order) {
        // console.log(order.spiceLevel)
    }
}

function isStringArray(arr: unknown): arr is string[] {
    //
}