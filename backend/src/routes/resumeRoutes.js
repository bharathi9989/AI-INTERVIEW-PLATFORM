import express from "express";
import upload from "../utils/multer.js"; // ✅ use this ONLY
import authMiddleware from "../middleware/authMiddleware.js";
import { uploadResume } from "../controllers/resumeController.js";

const router = express.Router();

// ✅ SINGLE ROUTE ONLY
router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);

export default router;
