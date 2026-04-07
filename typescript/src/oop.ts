
// class Chai {
//     flavour: string;
//     price: number;

//     // constructor(flavour: string, price: number) {
//     //     this.flavour = flavour
//     //     this.price = price
//     // }

//     constructor(flavour: string) {
//         this.flavour = flavour
//         console.log(this)
//     }
// }

// const masalaChai = new Chai("Ginger")
// masalaChai.flavour = "masala"


// Access modifiers

class Chai {
    public flavour: string = "Masala"

    private _secretIngredients = "Cardamom"

    reveal() {
        return this._secretIngredients
    }

    protected __shopName = "Chai corner"

}

class Shop {
    protected __shopName: string = "Chai corner";
}

class Branch extends Shop {
    getName() {
        return this.__shopName // ok
    }
}

// new Branch().getName()

class Wallet {
    #balance = 100 // # - private variable

    getBalance() {
        return this.#balance
    }
}

const w = new Wallet()

class Cup {
    readonly capacity: number = 250

    constructor(capacity: number) {
        this.capacity = capacity
    }
}

class ModernChai {
    private _sugar = 2

    get sugar() {
        return this._sugar
    }

    set sugar(value: number) {
        if (value > 5) throw new Error("Too sweet")
        
        this._sugar = value
    }
}

const c = new ModernChai()
c.sugar = 3

// static
class EkChai {
    static shopName = "Chaicode caffe"

    constructor(public flavour: string) {

    }
}

console.log(EkChai.shopName)

// abstract class
abstract class Drink {
    abstract make(): void
}

class MyChai extends Drink {
    make(): void {
        console.log("Brewing chai")
    }
}

// composition
class Heater {
    heat() {

    }
}

class ChaiMaker {
    constructor(private heater: Heater) {

    }

    make() {
        this.heater.heat
    }
}