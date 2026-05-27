import express from 'express'
import Redis from 'ioredis'

const app = express()
app.use(express.json())

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

function otpKey(phone) {
    return `otp:${phone}`
}

app.post('/otp', async (req, res) => {
    const { phone } = req.body
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    await redis.set(otpKey(phone), otp, 'EX', 300) // valid for 5 minutes

    res.json({ message: "OTP sent successfully", otp }) // In real application, send the OTP to the user's phone number
})

app.post('/otp/verify', async (req, res) => {
    const { phone, otp } = req.body
    const savedOTP = await redis.get(otpKey(phone))

    if (!savedOTP) {
        return res.status(400).json({ message: "Expired OTP or OTP not found" })
    }

    if (savedOTP !== otp) {
        return res.status(400).json({ message: "Invalid OTP" })
    }

    await redis.del(otpKey(phone))

    res.json({ message: "OTP verified successfully" })
})

app.get('/otp/:phone/ttl', async (req, res) => {
    const { phone } = req.params
    const ttl = await redis.ttl(otpKey(phone))
    res.json({ ttl })
})

app.listen(8000, () => {
    console.log(`Your server is running on port 8000`)
})