require('dotenv/config')
const express = require('express');

const { loggerMiddleware } = require('./middlewares/logger')

const bookRouter = require('./routes/book.routes')
const authorRouter = require('./routes/author.routes')

const app = express()
const PORT = 8000

// function customMiddleware(req, res, next) {
//     console.log('I am a custom middleware')
//     next()
// }

// Middlewares (Plugins)
app.use(express.json())
app.use(loggerMiddleware)

// GET POST any request /books
// app.use('/books', (req, res, next) => {
// })

// Routes
app.use('/books', bookRouter)
app.use('/authors', authorRouter)

app.listen(PORT, () => {
    console.log(`http server is running on port ${PORT}`)
})