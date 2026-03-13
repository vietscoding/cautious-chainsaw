import express from "express";
import { getProfile, getStudentProfile, updateProfile } from "../controllers/userController.js";
import { authenticate } from "../middleware/authenMiddleware.js";

const router = express.Router();

// API3: profile endpoints
router.get("/getProfile", authenticate, getProfile);
router.get("/getStudentProfile", authenticate, getStudentProfile);
router.patch("/patchProfile", authenticate, updateProfile);



export default router;