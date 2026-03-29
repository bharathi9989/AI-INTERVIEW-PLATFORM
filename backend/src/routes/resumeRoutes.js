import express from "express";
import multer from "multer";

import { uploadResume } from "../controllers/resumeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// =====================================================
// 🔥 MULTER CONFIG (SDE LEVEL)
// =====================================================

// store files in uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// file filter (only allow PDFs)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

// multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// =====================================================
// 🔥 ROUTES
// =====================================================

/*
  POST /api/resume/upload
  Upload and process resume
  Protected route
*/
router.post(
  "/upload",
  upload.single("resume"), // 🔥 must match frontend formData key
  uploadResume,
);

export default router;
