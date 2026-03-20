import fs from "fs";
import pkg from "pdf-parse";

const pdfParse = pkg;

import { createResume } from "../repositories/resumeRepository.js";
import { generateQuestions } from "./aiService.js";

export const processResumeService = async ({ userId, file }) => {
  const fileBuffer = fs.readFileSync(file.path);

  const data = await pdfParse(fileBuffer);

  const extractedText = data.text;

  const aiResult = await generateQuestions(extractedText);

  const resume = await createResume({
    userId,
    fileName: file.originalname,
    fileUrl: file.path,
    extractedText,
  });

  return {
    resumeId: resume._id,
    questions: aiResult.questions,
  };
};
