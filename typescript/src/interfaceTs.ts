type chaiOrder = {
    type: string, 
    sugar: number, 
    strong: boolean
}

function makeChai(order: chaiOrder) {
    console.log(order)
}

function serveChai(order: chaiOrder) {
    console.log(order)
}

interface TeaRecipe {
    water: number,
    milk: number
}

// class MasalaChai implements TeaRecipe {
//     water = 100;
//     milk = 50;
// }

interface CupSize {
    size: "small" | "large"
}

class Chai implements CupSize {
    size: "small" | "large" = "small";
}

type Response = {
    ok: true
} | 
{
    ok: false
}

// class myRes implements Response {
//     ok: boolean = true;
// }

// Union

type TeaType = "masala" | "ginger" | "lemon" // literal types

function orderChai(t: TeaType) {
    console.log(t)
}

// Intersection

type BaseChai = {
    teaLeaves: number
}

type Extra = {
    masala: number
}

type MasalaChai = BaseChai & Extra

const cup: MasalaChai = {
    teaLeaves: 4,
    masala: 10,
}

// Optional
type User = {
    username: string;
    bio?: string; // optinal
}

const u1: User = {username: "surya001"}
const u2: User = {username: "surya002", bio: "developer"}

type Config = {
    readonly appName: string
    version: number
}

const cfg: Config = {
    appName: "testApp",
    version: 1
}

// cfg.appName = "test" // give error, no write, read only