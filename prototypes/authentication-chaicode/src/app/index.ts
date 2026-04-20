import express from "express";
import type { Express } from "express";

import { authRouter } from "./auth/routes.js"
import { autheticationMiddleware } from "./middleware/auth-middleware.js";

export function createApplication(): Express {
    const app = express()

    // Middlewares
    app.use(express.json())
    app.use(autheticationMiddleware())

    // Routes

    app.get("/", (req, res) => {
        return res.json({ message: "Welcome to auth service" })
    })

    app.use("/auth", authRouter)

    return app
}