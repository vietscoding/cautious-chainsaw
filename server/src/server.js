import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import transcriptRoutes from "./routes/transcriptRoutes.js";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transcript", transcriptRoutes);

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: "Too many login attempts"
});

app.post("/api/auth/login", loginLimiter, authController);

app.listen(port, () =>
    console.log(`Server running on port ${port} at ${new Date().toLocaleString()}`)
);