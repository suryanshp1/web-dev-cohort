import http from "node:http";
import { Server } from "socket.io";
import path from "node:path";
import express from "express";

async function main() {
    const app = express();

    app.use(express.static(path.resolve("./public")));

    const server = http.createServer(app);

    const io = new Server(server);

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("chat message", (msg) => {
            console.log("Message received:", msg);
            // Broadcast to all other clients
            socket.broadcast.emit("chat message", msg);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    server.listen(9000, () => {
        console.log("HTTP server is running on port 9000");
    });
}

main();