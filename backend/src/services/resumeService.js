import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

// ================================
// PDF → TEXT
// ================================
export const processResumeService = async (filePath) => {
  try {
    if (!filePath) throw new Error("File path missing");

    const buffer = fs.readFileSync(filePath);

    const data = await pdfParse(buffer);

    let text = data.text;

    // fallback check
    if (!text || text.trim().length < 20) {
      throw new Error("PDF has no readable text (maybe scanned)");
    }

    console.log("✅ TEXT:", text.slice(0, 100));

    return text;
  } catch (error) {
    console.error("❌ RESUME ERROR:", error.message);
    throw new Error("Resume processing failed");
  }
};

// ================================
// TEXT → QUESTIONS
// ================================
export const generateQuestions = (text) => {
  const questions = [];

  const lower = text.toLowerCase();

  if (lower.includes("javascript")) {
    questions.push({
      question: "Explain closures in JavaScript",
      type: "technical",
      difficulty: "medium",
    });
  }

  if (lower.includes("react")) {
    questions.push({
      question: "What is Virtual DOM?",
      type: "technical",
      difficulty: "medium",
    });
  }

  if (lower.includes("node")) {
    questions.push({
      question: "Explain Node.js event loop",
      type: "technical",
      difficulty: "medium",
    });
  }

  // always add fallback
  questions.push({
    question: "Tell me about yourself",
    type: "general",
    difficulty: "easy",
  });

  return questions;
};
