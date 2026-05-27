import express from 'express'
import { emailQueue } from './queue.js'

const app = express()
app.use(express.json())

app.post('/welcome-email', async (req, res) => {
    const job = await emailQueue.add(
        "send-welcome-email",
        {
            to: req.body.to,
            name: req.body.name || "No name",
            subject: req.body.subject || "No subject",
            body: req.body.body || "No content",
            createdAt: new Date().toISOString(),
        },
        {
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 1000,
            },
        }
    )

    res.json({ message: "Email sent successfully", jobId: job.id })
})

app.listen(8000, () => {
    console.log(`Your server is running on port 8000`)
})