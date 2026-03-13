import express from "express";
import { register, login, students } from "../controllers/authController.js"; // nhập các hàm từ trong authController.js
import { getProfile, updateProfile, bulkCreateStudents } from "../controllers/userController.js";
import { authenticate } from "../middleware/authenMiddleware.js";
import {
    loginLimiter,
    registerLimiter
} from "../middleware/limiterMiddleware.js";

const router = express.Router();

// API2:vulnerability
// router.post("/register", register);
// router.post("/login", login);

// API2:fix
router.post("/register", registerLimiter, register);
router.post("/login", loginLimiter, login);

// API3: profile endpoints
router.get("/profile", authenticate, getProfile);
router.patch("/profile", authenticate, updateProfile);

// API4: bulk create students
router.post("/students/bulk", authenticate, bulkCreateStudents);

export default router;

