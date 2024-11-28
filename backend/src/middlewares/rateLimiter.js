import rateLimit from 'express-rate-limit';

export const rateLimiter = (minutes, maxRequests) => {
    return rateLimit({
    windowMs: minutes * 60 * 1000,
    max: maxRequests,
    handler: (req, res) => {
        res.status(429).json({ msg: "Too many submissions from this IP" })
    }
})
}

