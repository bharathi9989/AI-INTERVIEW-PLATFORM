import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { evaluate } from "../controllers/interviewController.js";

const router = express.Router();

router.post("/evaluate", authMiddleware, evaluate);

export default router;
