import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'
import { authenticationMiddleware } from './middlewares/auth.middleware.js'
import jwt from 'jsonwebtoken'

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 8000

app.use(express.json())
app.use(authenticationMiddleware)

app.get('/', (req, res) => {
    res.json({ message: 'Api is running.....' })
})

app.use('/user', userRouter)
app.use('/admin', adminRouter)

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`)
})