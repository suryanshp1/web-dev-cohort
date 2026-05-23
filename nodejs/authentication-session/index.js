import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
import db from './db/index.js'
import { usersTable, userSessions } from './db/schema.js'
import { eq } from 'drizzle-orm'

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 8000

app.use(express.json())
app.use(async function(req, res, next) {
    const sessionId = req.headers['session-id']

    if (!sessionId) {
        return next()
    }

    const [data] = await db
        .select({
            id: userSessions.id,
            userId: userSessions.userId,
            name: usersTable.name,
            email: usersTable.email,
        })
        .from(userSessions)
        .rightJoin(usersTable, eq(usersTable.id, userSessions.userId))
        .where((table) => eq(table.id, sessionId))

    if (!data) {
        return next()
    }

    req.user = data

    next()
})

app.get('/', (req, res) => {
    res.json({ message: 'Api is running.....' })
})

app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`)
})