const express = require("express");

const app = express()

app.use(express.json())

app.get("/menu", (req, res) => res.json({
    items: ["thali", "biryani"]
}))

app.post("/order", myFunc)

const myFunc = (req, res) => {
    let order = req.body

    res.status(201).json({
        status: "received",
        order: req.body,
    })
}