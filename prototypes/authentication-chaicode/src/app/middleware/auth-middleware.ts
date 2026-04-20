import type { Request, Response, NextFunction } from "express"
import { verifyUserToken } from "../auth/utils/token.js"


export function autheticationMiddleware() {
    return function(req: Request, res: Response, next: NextFunction) {
        const header = req.headers["authorization"]
        if (!header) {
            return next()
        }
        
        if (!header?.startsWith('Bearer')) {
            return res.status(400).json({ error: 'authorization header must starts with bearer' })
        }

        const token = header.split(' ')[1]

        if (!token) {
            return res.status(400).json({ error: 'authorization header must starts with bearer and have token' })
        }

        const user = verifyUserToken(token)

        // @ts-ignore
        req.user = user

        return next()
    }
}

export function restrictToAuthenticatedUser() {
    return function(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        if (!req.user) return res.status(401).json({ error: 'Authentication required' })
        return next()
    }
}