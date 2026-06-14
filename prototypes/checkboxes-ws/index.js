import http from "node:http"
import path from "node:path"

import express from "express"
import { Server} from "socket.io"

async function main() {
    const app = express()

    app.use(express.static(path.resolve("./public")))

    app.get("/health", (req, res) => {
        res.json({ message: "I am healthy" })
    })

    const server = http.createServer(app)
    const io = new Server(server)
    io.attach(server)

    // Socket IO handlers
    io.on('connection', (socket) => {
        console.log(`Socket Connected `, {id: socket.id});

        socket.on("client:checkbox:change", (data) => {
            
        })
    })

    // express
    const PORT = process.env.PORT ?? 8000

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
}

main()