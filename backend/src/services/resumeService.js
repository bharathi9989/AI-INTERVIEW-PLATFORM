import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParseModule = require("pdf-parse");
const pdfParse =
  typeof pdfParseModule === "function"
    ? pdfParseModule
    : pdfParseModule.default;

// PDF → TEXT
export const processResumeService = async (filePath) => {
  const buffer = fs.readFileSync(filePath);

  const data = await pdfParse(buffer);

  return data.text;
};

// TEXT → QUESTIONS
export const generateQuestions = (text) => {
  const questions = [];
  const t = text.toLowerCase();

  if (t.includes("javascript")) {
    questions.push({ question: "What is closure in JavaScript?" });
  }
  if (t.includes("node")) {
    questions.push({ question: "Explain event loop in Node.js" });
  }
  if (t.includes("react")) {
    questions.push({ question: "What is useEffect?" });
  }

  questions.push({ question: "Tell me about yourself" });

  return questions;
};
