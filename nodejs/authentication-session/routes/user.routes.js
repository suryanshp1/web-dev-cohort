import express from 'express'
import db from '../db/index.js'
import { usersTable, userSessions } from '../db/schema.js'
import { eq } from 'drizzle-orm'
import { randomBytes, createHmac } from 'node:crypto'

const router = express.Router()

router.get('/'); // returns current loggedIn user

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body

    const [existingUser] = await db
        .select()
        .from(usersTable)
        .where((table) => eq(table.email, email))

    if (existingUser) {
        return res.status(400).json({ message: "Email already exists" })
    }

    const salt = randomBytes(256).toString("hex")
    const hashedPassword = createHmac("sha256", salt).update(password).digest("hex")

    const [user] = await db.insert(usersTable).values({
        name,
        email,
        password: hashedPassword,
        salt
    }).returning({ id: usersTable.id })

    return res.status(201).json({ status: "success", data: { userId: user.id } })
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const [existingUser] = await db
        .select({
            id: usersTable.id,
            email: usersTable.email,
            salt: usersTable.salt,
            password: usersTable.password
        })
        .from(usersTable)
        .where((table) => eq(table.email, email))

    if (!existingUser) {
        return res.status(404).json({ message: "User not found" })
    }

    const salt = existingUser.salt
    const hashedPassword = createHmac("sha256", salt).update(password).digest("hex")

    if (existingUser.password !== hashedPassword) {
        return res.status(401).json({ message: "Incorrect password" })
    }

    // Generate session for user
    const [session] = await db.insert(userSessions).values({
        userId: existingUser.id,
    }).returning({ id: userSessions.id })

    return res.status(200).json({ status: "success", sessionId: session.id })
});

router.post('/logout');

export default router;