import express from "express";
import { getTranscript } from "../controllers/transcriptController.js";
import { authenticate } from "../middleware/authenMiddleware.js";


const router = express.Router();

router.get("/students/:id", authenticate, getTranscript); //bật dòng này và bỏ dòng dưới để demo cách khắc phục BOLA
// router.get("/students/:id", getTranscript);

export default router;
