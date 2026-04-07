let response: any = "42"

// forceful type assertion
let numericLength: number = (response as string).length

type Book = {
    name: string
}

let bookString = '{"name": "who moved my cheese"}'

let bookObject = JSON.parse(bookString) as Book

console.log(bookObject.name)

const inputElement = document.getElementById("username") as HTMLElement

let value: any
value = "chai"
value = [1,2,3,4]
value = 2.5

value.toUpperCase()
let newValue: unknown
newValue = "chai"
newValue = [1,2,3,4]
newValue = 2.5
if (typeof newValue === 'string') {
    newValue.toUpperCase()
}

try {
   // 
} catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }
    console.log("Error", error)
}

const data: unknown = "chai aur code"
const strData: string = data as string

type Role = "admin" | "member" | "manager"

function redirectBasedOnRole(role: Role): void {
    if (role === "admin") {
        console.log("Redirecting to admin dashboard ....")
        return
    }
    if (role === "member") {
        console.log("Redirecting to user dashboard ....")
        return
    }
    if (role === "manager") {
        console.log("Redirecting to manager dashboard ....")
        return
    }
    role;
}

function neverReturn(): never {
    while(true) {
        //
    }
}