import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { evaluate, evaluateBatchController } from "../controllers/interviewController.js";
import { generateAnswer } from "../controllers/aicontroller.js";

const router = express.Router();

router.post("/evaluate", authMiddleware, evaluate);
router.post("/evaluate-batch", authMiddleware, evaluateBatchController);
router.post("/ai/generate", generateAnswer);


export default router;
