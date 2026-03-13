import express from "express";
import { getTranscript } from "../controllers/transcriptController.js";
import { authenticate } from "../middleware/authenMiddleware.js";


const router = express.Router();

// API1:vul
// router.get("/students/:id", getTranscript);

//API1:fix
router.get("/students/:id", authenticate, getTranscript);



export default router;
