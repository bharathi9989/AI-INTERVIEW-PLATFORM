// Interview Controller

import { asyncHandler } from "../core/asyncHandler.js";
import { evaluateAnswer } from "../services/aiService.js";

export const evaluate = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({
      message: "Question and answer required",
    });
  }

  const result = await evaluateAnswer(question, answer);

  res.json({
    success: true,
    data: result,
  });
});

// src/controllers/interviewController.js

export const evaluateBatchController = asyncHandler(async (req, res) => {

  const { qaList } = req.body;

  if (!qaList || qaList.length === 0) {
    return res.status(400).json({
      message: "qaList required"
    });
  }

  const result = await evaluateBatch(qaList);

  res.json({
    success: true,
    data: result
  });

});