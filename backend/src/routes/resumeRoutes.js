import express from "express";
import multer from "multer";

import { uploadResume } from "../controllers/resumeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ================================
// MULTER CONFIG
// ================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// ================================
// ROUTE
// ================================
router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);

export default router;
