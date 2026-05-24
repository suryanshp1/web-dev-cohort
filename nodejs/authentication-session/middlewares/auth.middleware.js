import jwt from 'jsonwebtoken'

export const authenticationMiddleware = async (req, res, next) => {
    try {
        const tokenHeader = req.headers['authorization']
        
        if (!tokenHeader) {
            return next()
        }

        if (!tokenHeader.startsWith('Bearer ')) {
            return res.status(400).json({ error: 'authorization header must starts with Bearer' })
        }

        const token = tokenHeader.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()
    } catch (error) {
        next()
    }
}

export const ensureAuthenticatedMiddleware = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' })
    }
    next()
}

export const restrictToRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ error: 'You are not authorized to perform this action' })
        }
        
        next()
    }
}