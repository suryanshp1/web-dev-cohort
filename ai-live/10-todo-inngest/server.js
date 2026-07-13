import express from "express";
import { todos, createTodo, getTodo, updateTodo, deleteTodo } from "./store.js";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js";
import { onTodoCreated, onTodoDeleted } from "./inngest/functions.js";
import dotenv from "dotenv";

dotenv.config();

const app = express()
app.use(express.json())

app.use(
    "/api/inngest",
    serve(
        {
            client: inngest,
            functions: [onTodoCreated, onTodoDeleted],
        }
    )
)

app.get("/", (req, res) => {
    return res.json({ status: 'Server is up and running.....' })
})

app.get("/todos", (req, res) => {
    return res.json({ todos })
})

app.post("/todos", async (req, res) => {
    const { title } = req.body
    if (!title) {
        res.status(400).json({ error: "Title is required" })
    }
    const todo = createTodo(title)
    await inngest.send({
        name: "todo/created",
        data: { todo },
    })
    res.status(201).json(todo)
})

app.get("/todos/:id", (req, res) => {
    const todo = getTodo(parseInt(req.params.id, 10))
    return res.json({ todo })
})

app.put("/todos/:id", (req, res) => {
    const todo = updateTodo(parseInt(req.params.id, 10), req.body)
    return res.json({ todo })
})

app.delete("/todos/:id", async (req, res) => {
    const todo = deleteTodo(parseInt(req.params.id, 10))
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" })
    }
    await inngest.send({
        name: "todo/deleted",
        data: { todo },
    })
    return res.json({ todo })
})

app.listen(8000, () => {
    console.log(`Your server is running on port 8000`)
})