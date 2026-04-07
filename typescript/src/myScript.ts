// function addNum(a: number, b: number): number {
//     return a + b
// }

// const result = addNum(1, 2)
// console.log(result.toString())


// In memory DB
// key - value store => HashMAp(key, Value)

type UserID = string

interface User {
    id: UserID
    fname: string
    lname?: string
    email: string
    contact: {
        mobile: string
    }
    address: {
        street: string
        pin: number
        country: string
    }
}

class InMemoryDB {
    private _db: Map<UserID, User>

    constructor() {

    }

    public insertUser(data: User): UserID {
        if (this._db.has(data.id)) {
            throw new Error(`User with id ${data.id} already exists`)
        }

        this._db.set(data.id, data)
        return data.id
    }

    public updateUser(id: UserID, updateData: Omit<User, "id">) {
        if (!this._db.has(id)) throw new Error(`User ID with ${id} does not exist`)
        this._db.set(id, {...updateData, id})
        return true
    }

    public getUserByID(id: UserID) {
        if (!this._db.has(id)) throw new Error(`User ID with ${id} does not exist`)
        return this._db.get(id)
    }
}

const myDB = new InMemoryDB()
myDB.insertUser({
    id: "2",
    fname: "Surya",
    email: "s@gmail.com",
    contact: {
        mobile: "334"
    },
    address: {
        country: "IN",
        street: "GHZ",
        pin: 233222
    }
})

myDB.updateUser("2", {
    fname: "Surya",
    email: "s@gmail.com",
    contact: {
        mobile: "334"
    },
    address: {
        country: "IN",
        street: "GHZ",
        pin: 233222
    }
})