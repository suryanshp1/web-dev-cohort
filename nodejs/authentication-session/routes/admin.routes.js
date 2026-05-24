import express from "express";
import db from "../db/index.js"
import { usersTable } from "../db/schema.js"
import { ensureAuthenticatedMiddleware, restrictToRole } from "../middlewares/auth.middleware.js"

const adminRestrictMiddleware = restrictToRole('ADMIN')

const router = express.Router();

router.get('/users', ensureAuthenticatedMiddleware, adminRestrictMiddleware, async(req, res) => {

    const users = await db
        .select({
            id: usersTable.id,
            name: usersTable.name,
            email: usersTable.email
        }).from(usersTable)
    return res.status(200).json({ users })
})


export default router;