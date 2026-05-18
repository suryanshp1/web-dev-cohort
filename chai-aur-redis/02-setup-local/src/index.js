import express from 'express'
import Redis from 'ioredis'
import mongoose from 'mongoose'

const app = express()

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

app.get('/redis', async (req, res) => {
    const reply = await redis.ping()
    res.json({ redis: reply })
})

app.get('/mongo', async (req, res) => {
    const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/chai_aur_redis'
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(url)
    }
    res.json({ mongo: "connected", "database": mongoose.connection.db.databaseName })
})

app.listen(8000, () => {
    console.log(`Your server is running on port 8000`)
})