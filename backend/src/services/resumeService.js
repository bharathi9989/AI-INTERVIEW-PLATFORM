import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";

// =====================================================
// PDF → TEXT (SAFE VERSION)
// =====================================================
export const processResumeService = async (filePath) => {
  try {
    const data = new Uint8Array(fs.readFileSync(filePath));

    const pdf = await pdfjsLib.getDocument({ data }).promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const strings = content.items.map((item) => item.str);
      text += strings.join(" ") + "\n";
    }

    if (!text) {
      throw new Error("No text extracted");
    }

    console.log("✅ TEXT:", text.slice(0, 100));

    return text;
  } catch (error) {
    console.error("❌ PDF ERROR:", error.message);
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
