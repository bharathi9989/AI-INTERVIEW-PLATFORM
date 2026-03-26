// Resume controller

import { asyncHandler } from "../core/asyncHandler.js";
import { processResumeService } from "../services/resumeService.js";

export const uploadResume = asyncHandler(async (req, res) => {
  console.log("FILE:", req.file); // 🔥 ADD THIS

  if (!req.file) {
    throw new Error("No file uploaded");
  }

  const result = await processResumeService(req.file.path);

  res.json({
    success: true,
    data: result,
  });
});