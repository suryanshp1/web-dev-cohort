import express from "express";
import { serve } from "inngest/express";
import dotenv from "dotenv";

import { inngest } from "./inngest-client.js";
import { onOrderPlaced } from "./01-inngest.js";
import { summarizeThenTranslate } from "./02-step-ai.js";


dotenv.config();

const app = express()
app.use(express.json())

app.use(
    "/api/inngest",
    serve(
        {
            client: inngest,
            functions: [onOrderPlaced, summarizeThenTranslate],
        }
    )
)

app.get("/", (req, res) => {
    return res.json({ status: 'Server is up and running.....' })
})

app.listen(3000, () => {
    console.log(`Your server is running on port 3000`)
})