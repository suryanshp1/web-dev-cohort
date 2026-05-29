import { verifyUserToken } from "../utils/token.js"

/**
 * 
 * @param {import {"express"}.Request} req 
 * @param {import {"express"}.Response} res 
 * @param {import {"express"}.NextFunction} next 
 */

export async function authenticationMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        return next()
    }
    
    if (!authHeader?.startsWith('Bearer')) {
        return res.status(400).json({ error: 'authorization header must starts with bearer' })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(400).json({ error: 'authorization header must starts with bearer and have token' })
    }

    const user = await verifyUserToken(token)

    // @ts-ignore
    req.user = user

    next()
}

/**
 * 
 * @param {import {"express"}.Request} req 
 * @param {import {"express"}.Response} res 
 * @param {import {"express"}.NextFunction} next 
 */

export function ensureAuthentication(req, res, next) {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'You must be logged in to perform this action' });
    }
    next()
}