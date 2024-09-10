import rateLimit from 'express-rate-limit';

export const emailRateLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    max: 2, // Limit each IP to 5 requests per (15 minutes)
    message: "Too many email submissions from this IP, please try again later."
});

