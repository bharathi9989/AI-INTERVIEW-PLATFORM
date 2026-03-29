import { asyncHandler } from "../core/asyncHandler.js";
import {
  processResumeService,
  generateQuestions,
} from "../services/resumeService.js";

export const uploadResume = asyncHandler(async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  // 🔥 STEP 1: PDF → TEXT
  const text = await processResumeService(file.path);

  console.log("TEXT:", text.slice(0, 100));

  // 🔥 STEP 2: TEXT → QUESTIONS
  const questions = generateQuestions(text);

  res.status(200).json({
    success: true,
    data: {
      questions,
    },
  });
});
