import rateLimit, { ipKeyGenerator } from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5,
    handler: (req, res) => {
        res.status(429).json({
            error: "Too many login attempts, please try again later.",
        });
    },
    keyGenerator: (req) => ipKeyGenerator(req),
    standardHeaders: true,
    legacyHeaders: false,
});


// another limiter for registration, password reset, etc.
export const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: { error: "Too many accounts created from this IP, please try again later" },
});

// app.post("/api/auth/login", loginLimiter, authController);
