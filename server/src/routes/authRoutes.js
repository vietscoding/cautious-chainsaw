import express from "express";
import { register, login, students } from "../controllers/authController.js"; // nhập các hàm từ trong authController.js
import { getProfile, updateProfile, bulkCreateStudents, getAllUsersAdmin, deleteStudentAdmin } from "../controllers/userController.js";
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



export default router;

