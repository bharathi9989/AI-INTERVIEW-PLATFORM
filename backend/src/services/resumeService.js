import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse"); // ✅ guaranteed working

// =====================================================
// PDF → TEXT
// =====================================================
export const processResumeService = async (filePath) => {
  try {
    if (!filePath) {
      throw new Error("File path missing");
    }

    const buffer = fs.readFileSync(filePath);

    const data = await pdfParse(buffer);

    const text = data.text;

    if (!text) {
      throw new Error("No text extracted");
    }

    console.log("✅ TEXT:", text.slice(0, 100));

    return text;
  } catch (error) {
    console.error("❌ RESUME ERROR:", error.message);
    throw new Error("Resume processing failed");
  }
};

// =====================================================
// TEXT → QUESTIONS
// =====================================================
export const generateQuestions = (text) => {
  const questions = [];

  if (text.toLowerCase().includes("javascript")) {
    questions.push({
      question: "Explain closures in JavaScript",
      type: "technical",
      difficulty: "medium",
    });
  }

  if (text.toLowerCase().includes("react")) {
    questions.push({
      question: "What is Virtual DOM?",
      type: "technical",
      difficulty: "medium",
    });
  }

  if (text.toLowerCase().includes("node")) {
    questions.push({
      question: "Explain Node.js event loop",
      type: "technical",
      difficulty: "medium",
    });
  }

  questions.push({
    question: "Tell me about yourself",
    type: "general",
    difficulty: "easy",
  });

  return questions;
};
