import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 8000

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'Api is running.....' })
})

app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`)
})