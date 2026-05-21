const express = require('express')
const authorsTable = require('../models/author.model')
const booksTable = require('../models/book.model')
const db = require('../db/index')
const { eq } = require('drizzle-orm')

const router = express.Router()

router.get("/", async (req, res) => {
    const authors = await db.select().from(authorsTable)
    return res.json(authors)
})

router.get("/:id", async (req, res) => {
    const id = req.params.id
    const author = await db.select().from(authorsTable).where(eq(authorsTable.id, id)).limit(1)
    if (!author) {
        return res.status(404).json({ error: `Author with id ${id} does not exist` })
    }
    return res.json(author)
})

router.post("/", async (req, res) => {
    const { firstName, lastName, email } = req.body
    const [author] = await db.insert(authorsTable).values({
        firstName,
        lastName,
        email,
    }).returning({ id: authorsTable.id })
    return res.json({ message: "Author has been created successfully", id: author?.id })
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const author = await db.delete(authorsTable).where(eq(authorsTable.id, id)).returning({ id: authorsTable.id })
    if (!author) {
        return res.status(404).json({ error: `Author with id ${id} does not exist` })
    }
    return res.json(author)
})

router.get('/:id/books', async (req, res) => {
    const id = req.params.id

    const books = await db.select().from(booksTable).where(eq(booksTable.authorId, id))

    if (!books) {
        return res.status(404).json({ error: `Author with id ${id} does not exist` })
    }

    return res.json(books)
})

module.exports = router