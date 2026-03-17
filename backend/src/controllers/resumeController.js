// Resume controller

import { asyncHandler } from "../core/asyncHandler.js";
import { processResumeService } from "../services/resumeService.js";

export const uploadResume = asyncHandler(async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  const result = await processResumeService({
    userId: req.user.id,
    file,
  });

  res.status(201).json({
    success: true,
    data: result,
  });
});