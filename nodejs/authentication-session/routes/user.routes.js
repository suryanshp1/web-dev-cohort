import express from 'express'
import db from '../db/index.js'
import { usersTable, userSessions } from '../db/schema.js'
import { ensureAuthenticatedMiddleware } from '../middlewares/auth.middleware.js'
import { eq } from 'drizzle-orm'
import { randomBytes, createHmac } from 'node:crypto'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.patch("/", ensureAuthenticatedMiddleware,async (req, res) => {
    const user = req.user

    const { name } = req.body

    await db
        .update(usersTable)
        .set({ name })
        .where(eq(usersTable.id, user.userId))
    
    return res.status(200).json({ status: "success" })
})

router.get('/', ensureAuthenticatedMiddleware, async (req, res) => {

    const user = req.user

    return res.status(200).json({ user })
}); // returns current loggedIn user

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
            role: usersTable.role,
            password: usersTable.password,
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

    const payload = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.email,
        role: existingUser.role,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "4h"
    })

    return res.status(200).json({ status: "success", token })
});

router.post('/logout');

export default router;