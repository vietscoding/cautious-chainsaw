import express from "express";
import { register, login, students } from "../controllers/authController.js"; // nhập các hàm từ trong authController.js
const router = express.Router();

router.post("/register", register);
router.post("/login", login);


export default router;

