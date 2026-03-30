import fs from "fs";

// =====================================================
// 🔥 STEP 1: PDF → TEXT
// =====================================================
export const processResumeService = async (filePath) => {
  try {
    const buffer = fs.readFileSync(filePath);

    const pdfParse = (await import("pdf-parse")).default;

    const data = await pdfParse(buffer);

    const text = data.text;

    if (!text) {
      throw new Error("No text extracted");
    }

    return text;
  } catch (error) {
    console.error("RESUME ERROR:", error.message);
    throw new Error("Resume processing failed");
  }
};

// =====================================================
// 🔥 STEP 2: TEXT → QUESTIONS (RULE-BASED VERSION)
// =====================================================
export const generateQuestions = (text) => {
  const questions = [];

  // simple keyword-based generation
  if (text.toLowerCase().includes("javascript")) {
    questions.push({
      question: "Explain closures in JavaScript",
      type: "technical",
      difficulty: "medium",
    });
  }

  if (text.toLowerCase().includes("react")) {
    questions.push({
      question: "What is Virtual DOM in React?",
      type: "technical",
      difficulty: "medium",
    });
  }

  if (text.toLowerCase().includes("node")) {
    questions.push({
      question: "What is event loop in Node.js?",
      type: "technical",
      difficulty: "medium",
    });
  }

  // default fallback
  questions.push({
    question: "Tell me about yourself",
    type: "general",
    difficulty: "easy",
  });

  return questions;
};
