// Resume controller

import { asyncHandler } from "../core/asyncHandler.js";
import { processResumeService } from "../services/resumeService.js";

export const uploadResume = async (req, res) => {
  try {
    console.log("FILE:", req.file);

    return res.status(200).json({
      success: true,
      data: {
        questions: [
          { question: "Tell me about yourself" },
          { question: "What is Node.js?" },
        ],
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};