import fs from "fs";
import pdfParse from "pdf-parse";

import { createResume } from "../repositories/resumeRepository.js";

export const processResumeService = async ({ userId, file }) => {
  // read uploaded file
  const fileBuffer = fs.readFileSync(file.path);

  // extract text from PDF
  const data = await pdfParse(fileBuffer);

  const extractedText = data.text;

  // save to DB
  const resume = await createResume({
    userId,
    fileName: file.originalname,
    fileUrl: file.path,
    extractedText,
  });

  return {
    id: resume._id,
    fileName: resume.fileName,
  };
};
