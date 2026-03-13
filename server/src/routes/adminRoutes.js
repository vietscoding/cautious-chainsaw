import express from "express";
import { authenticate } from "../middleware/authenMiddleware.js";
import { getAllUsersAdmin, deleteStudentAdmin } from "../controllers/userController.js";

const router = express.Router();

// API5: admin endpoints
router.get("/admin/users", authenticate, getAllUsersAdmin);
router.delete("/admin/students/:id", authenticate, deleteStudentAdmin);

export default router;

