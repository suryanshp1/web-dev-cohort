import express from "express"


const app = express()
const PORT = 8000

// Middleware
app.use(express.json())

const DIARY = {}
const EMAILS = new Set()

// Hey, Here is my car - Pls park it and give me back a token
// Email - unique car number
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    if (EMAILS.has(email)) {
        return res.status(400).json({ message: "Email already exists" })
    }

    // create a token
    const token = `${Date.now()}`

    // Do a diary entry
    DIARY[token] = { name, email, password };
    EMAILS.add(email)

    return res.json({ status: "success" ,token })
})

app.post('/me', (req, res) => {
    const { token } = req.body
    if (!token) {
        return res.status(400).json({ message: "Missing token" })
    }

    if (!token in DIARY) {
        return res.status(400).json({ message: "Invalid token" })
    }

    const entry = DIARY[token]
    return res.json({ data: entry })
})

app.post('/private-data', (req, res) => {
    const { token } = req.body
    if (!token) {
        return res.status(400).json({ message: "Missing token" })
    }

    if (!token in DIARY) {
        return res.status(400).json({ message: "Invalid token" })
    }

    const entry = DIARY[token]
    return res.json({ data: { privateData: "Access granted" } })
    })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})