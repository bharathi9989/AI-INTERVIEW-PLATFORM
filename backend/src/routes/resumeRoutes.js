import express from "express";
import upload from "../utils/multer.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { uploadResume } from "../controllers/resumeController.js";
import multer from "multer";


const router = express.Router();


router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("resume"), (req, res) => {
  console.log(req.file); // debug
  res.json({ message: "Uploaded successfully" });
});


export default router;
