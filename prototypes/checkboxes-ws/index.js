import http from "node:http"
import path from "node:path"

import express from "express"
import { Server} from "socket.io"
import {publisher, subscriber, redis} from "./redis-connection.js"

const CHECKBOX_COUNT = 100
const CHECKBOX_STATE_KEY='checkbox-state'

const state = {
    checkboxes: new Array(CHECKBOX_COUNT).fill(false)
}

const rateLimitingHashMap = new Map()

// socket.id, 12:01

async function main() {
    const app = express()

    app.use(express.static(path.resolve("./public")))

    app.get("/health", (req, res) => {
        res.json({ message: "I am healthy" })
    })

    app.get("/checkboxes", async(req, res) => {

        const existingState = await redis.get(CHECKBOX_STATE_KEY)

        if (existingState) {
            const remoteData = JSON.parse(existingState)
            return res.json({ checkboxes: remoteData })
        } else {
            return res.json({ checkboxes: new Array(CHECKBOX_COUNT).fill(false) })
        }
    })

    const server = http.createServer(app)
    const io = new Server(server)
    io.attach(server)

    await subscriber.subscribe('internal-server:checkbox:change', (err) => {
        if (err) {
            throw err
        }
        console.log('Subscribed to internal-server:checkbox:change channel successfully')
    })
    subscriber.on('message', (channel, message) => {
        if (channel === 'internal-server:checkbox:change') {
            const {index, checked} = JSON.parse(message)
            state.checkboxes[index] = checked

            io.emit("server:checkbox:change", {index, checked})
        }
    })

    // Socket IO handlers
    io.on('connection', (socket) => {
        console.log(`Socket Connected `, {id: socket.id});

        socket.on("client:checkbox:change", async(data) => {
            console.log(`[Socket:${socket.id}] - client:checkbox:change`, data)

            const lastOperationTime = rateLimitingHashMap.get(socket.id)
            if (lastOperationTime) {
                const timeElapsed = Date.now() - lastOperationTime
                if (timeElapsed < 5.5 * 1000) {
                    socket.emit('server:error', { error: 'Rate limit exceeded' })
                    return
                }
            }
            
            rateLimitingHashMap.set(socket.id, Date.now())

            const existingState = await redis.get(CHECKBOX_STATE_KEY)
            if (existingState) {
                const remoteData = JSON.parse(existingState)
                remoteData[data.index] = data.checked
                await redis.set(CHECKBOX_STATE_KEY, JSON.stringify(remoteData))
            } else {
                await redis.set(CHECKBOX_STATE_KEY, JSON.stringify(new Array(CHECKBOX_COUNT).fill(false)))
            }
            
            // io.emit("client:checkbox:change", data)
            // state.checkboxes[data.index] = data.checked
            await publisher.publish('internal-server:checkbox:change', JSON.stringify(data))
        })
    })

    // express
    const PORT = process.env.PORT ?? 8000

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
}

main()