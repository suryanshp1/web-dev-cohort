const chai = {
    name: "Masala Chai",
    price: 20,
    isHot: true
}

// typescript always infers
// {
//     name: string;
//     price: number;
//     isHot: boolean
// }

let tea: {
    name: string,
    price: number,
    isHot: boolean
}

tea = {
    name: "Ginger Tea",
    price: 24,
    isHot: true
}

type Tea = {
    name: string,
    price: number,
    ingredients: string[]
}

const adrakChai: Tea = {
    name: "Adrak Chai",
    price: 25,
    ingredients: ["ginger", "sugar", "tea leaves"]
}

type Cup = {
    size: string
}

let smallCup: Cup = {
    size: "200ml"
}

let bigCup = {
    size: "500ml",
    material: "steel"
}

smallCup = bigCup

type Brew = {
    brewTime: number
}

const coffee = {
    brewTime: 5,
    beans: "Arabica"
}

const chaiBrew: Brew = coffee

type User = {
    username: string;
    password: string
}

const u: User = {
    username: "chaicode",
    password: "123"
}

type Item = {
    name: string;
    quantity: number
}

type Address = {
    street: string;
    pin: number
}

type Order = {
    id: string,
    items: Item[],
    address: Address
}

// type Chai = {
//     name: string,
//     price: number,
//     isHot: boolean
// }

// const UpdateChai = (updates: Partial<Chai>) => {
//     console.log("updating chai with", updates)
// }

// UpdateChai({price: 25})
// UpdateChai({isHot: false})
// UpdateChai({})

type chaiOrder = {
    name?: string,
    quantity?: number,
}

const placeOrder = (order: Required<chaiOrder>) => {
    console.log(order)
}

placeOrder({name: "Giner Tea", quantity: 3})

type Chai = {
    name: string;
    price: number;
    isHot: boolean;
    ingredients: string[]
}

type BasicChaiInfo = Pick<Chai, "name" | "price">

const chaiInfo: BasicChaiInfo = {
    name: "Lemon Tea",
    price: 30
}

type ChaiNew = {
    name: string;
    price: number;
    isHot: boolean;
    secretIngredients: string[]
};

type PublicChai = Omit<Chai, "secretIngredients">