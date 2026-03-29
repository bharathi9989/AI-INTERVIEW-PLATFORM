import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export const processResumeService = async (filePath) => {
  const buffer = fs.readFileSync(filePath);

  const data = await pdfParse(buffer);

  return data.text;
};

export const generateQuestions = (text) => {
  const questions = [];

  if (text.toLowerCase().includes("javascript")) {
    questions.push({ question: "What is closure in JavaScript?" });
  }

  if (text.toLowerCase().includes("node")) {
    questions.push({ question: "Explain event loop in Node.js" });
  }

  if (text.toLowerCase().includes("react")) {
    questions.push({ question: "What is useEffect?" });
  }

  questions.push({ question: "Tell me about yourself" });

  return questions;
};