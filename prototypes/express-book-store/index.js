const express = require('express');

const app = express()
const PORT = 8000

// In memory DB
const books = [
    { id: 1, title: 'Book one', author: 'Author one' },
    { id: 2, title: 'Book two', author: 'Author two' }
];

// Middlewares (Plugins)
app.use(express.json())

app.use(function(req, res, next) {
    console.log('I am Middleware A');
    // return res.json({ message: "Boom! I am a middleware" })
    next()
})

app.use(function(req, res, next) {
    console.log('I am Middleware B');
    return res.json({ message: "Boom! I am a middleware B" })
})

// Routes
app.get('/books', (req, res) => {
    // res.setHeader('x-surya', 'Suryansh Pandey')
    res.json(books);
})

app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
        return res.status(400).json({ error: `The id must be of type number` })
    }

    const book = books.find(e => e.id === id)

    if (!book) {
        return res.status(404).json({ error: `Book with id ${id} does not exist` })
    }

    return res.json(book)
})

app.post('/books', (req, res) => {
    const { title, author } = req.body

    if (!title || title === '') return res.status(400).json({ error: 'title is required' })
    if (!author || author === '') return res.status(400).json({ error: 'author is required' })
    
    const id = books.length + 1

    const book = { id, title, author }
    books.push(book)

    return res.status(201).json({ message: 'Book created sucess', id })
})

app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
        return res.status(400).json({ error: `The id must be of type number` })
    }

    const indexToDelete = books.findIndex(e => e.id === id)

    if (indexToDelete < 0) {
        return res.status(404).json({ error: `Book with id ${id} does not exist` })
    }

    books.splice(indexToDelete, 1)

    return res.status(200).json({ message: 'book deleted' })
})

app.listen(PORT, () => {
    console.log(`http server is running on port ${PORT}`)
})