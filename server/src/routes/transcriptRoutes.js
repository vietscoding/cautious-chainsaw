import express from "express";
import { getTranscript } from "../controllers/transcriptController.js";
import { authenticate } from "../middleware/authenMiddleware.js";


const router = express.Router();

router.get("/students/:id", getTranscript);

export default router;
