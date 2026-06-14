import http from "node:http"
import path from "node:path"

import express from "express"
import { Server} from "socket.io"
import { stat } from "node:fs"

const CHECKBOX_COUNT = 100
const state = {
    checkboxes: new Array(CHECKBOX_COUNT).fill(false)
}

async function main() {
    const app = express()

    app.use(express.static(path.resolve("./public")))

    app.get("/health", (req, res) => {
        res.json({ message: "I am healthy" })
    })

    app.get("/checkboxes", (req, res) => {
        res.json({ checkboxes: state.checkboxes })
    })

    const server = http.createServer(app)
    const io = new Server(server)
    io.attach(server)

    // Socket IO handlers
    io.on('connection', (socket) => {
        console.log(`Socket Connected `, {id: socket.id});

        socket.on("client:checkbox:change", (data) => {
            console.log(`[Socket:${socket.id}] - client:checkbox:change`, data)
            io.emit("client:checkbox:change", data)
            state.checkboxes[data.index] = data.checked
        })
    })

    // express
    const PORT = process.env.PORT ?? 8000

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
}

main()