import express from "express";
import userRouter from "./routes/user.routes.js";
import urlRouter from "./routes/url.routes.js";
import {authenticationMiddleware} from "./middlewares/auth.middleware.js"

const PORT = process.env.PORT ?? 8000

const app = express()
app.use(express.json())
app.use(authenticationMiddleware)

app.get("/", (req, res) => {
    return res.json({ status: 'Server is up and running.....' })
})

app.use(urlRouter)
app.use("/users", userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})