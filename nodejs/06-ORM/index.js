// const dotenv = require('dotenv')
require('dotenv/config')
const db = require('./db')
const { userTable } = require('./drizzle/schema')

// dotenv.config()

async function getAllUsers() {
    const users = await db.select().from(userTable)
    console.log(users)
    return users
}


async function createUser({ id, name, email }) {
    await db.insert(userTable).values({
        id, 
        name, 
        email,
    })
}

getAllUsers()
// createUser({
//     id: 1,
//     name: 'John Doe',
//     email: 'M0EoC@example.com'
// })
// createUser({
//     id: 2,
//     name: 'Sam Smith',
//     email: 'smath@me.com'
// })