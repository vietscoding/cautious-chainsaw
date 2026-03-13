import express from "express";
import { bulkCreateStudents } from "../controllers/userController.js";
import { authenticate } from "../middleware/authenMiddleware.js";


const router = express.Router();

// API4: bulk create students
router.post("/students/bulk", authenticate, bulkCreateStudents);

export default router;

