import express from "express";
import { shortenPostRequestBodySchema } from '../validation/request.validation.js'
import { ensureAuthentication} from '../middlewares/auth.middleware.js'
import { insertUrl } from '../services/url.service.js'
import { db } from "../db/index.js";
import { urlsTable } from "../models/url.model.js";
import { eq, and } from "drizzle-orm";
import { nanoid} from 'nanoid'

const router = express.Router();

router.post('/shorten', ensureAuthentication, async (req, res) => {

    const validationResult = await shortenPostRequestBodySchema.safeParseAsync(req.body)

    if (!validationResult.success) {
        return res.status(400).json({
            status: "error",
            errors: validationResult.error.issues.map((err) => ({
                field: err.path[0],
                message: err.message,
            })),
        })
    }

    const { url, code } = validationResult.data

    if (!url) {
        return res.status(400).json({ message: 'Please provide longUrl' })
    }

    const shortCode = code ?? nanoid(6)

    const result = await insertUrl(shortCode, url, req.user.id)

    return res.status(200).json({ id: result.id, shortCode: result.shortCode, targetURL: result.targetURL })
});

router.get('/codes', ensureAuthentication, async (req, res) => {
    const codes = await db.select().from(urlsTable).where(eq(urlsTable.userId, req.user.id))

    return res.json(codes)
})

router.delete('/:id', ensureAuthentication, async (req, res) => {
    await db.delete(urlsTable)
            .where(and(eq(urlsTable.id, req.params.id), eq(urlsTable.userId, req.user.id)))

    return res.status(200).json({ deleted: true })
})

router.get('/:shortCode', async (req, res) => {
    const code = req.params.shortCode

    const [result] = await db.select().from(urlsTable).where(eq(urlsTable.shortCode, code))

    if (!result) {
        return res.status(404).json({ message: 'URL not found' })
    }

    return res.redirect(result.target)
})

export default router;