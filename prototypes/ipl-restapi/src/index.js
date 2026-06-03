import express from "express"
import dotenv from "dotenv"
import connectDB from "./common/config/db.js"
import ownerRouter from "./modules/ipl-ms/routes/owner.routes.js"

dotenv.config()

const app = express();

const PORT = process.env.PORT || 8000

app.get("/health", (req, res) => {
    returnres.json({ message: "I am healthy" })
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

// Routes
app.use("/owners", ownerRouter)

app.listen(PORT, async() => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`)
})