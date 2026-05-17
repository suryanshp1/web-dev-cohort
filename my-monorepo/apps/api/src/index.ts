import express from 'express'

const app = express()

const PORT = process.env.PORT || 3002

app.get('/health', (req, res) => {
    res.json({ message: 'Api is running.....' })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})