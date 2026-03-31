import fs from "fs";
import pdfParse from "pdf-parse";
import OpenAI from "openai";

// 🔥 OpenAI config
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// =====================================================
// 🔥 MAIN CONTROLLER
// =====================================================

export const uploadResume = async (req, res) => {
  try {
    // 1. Check file
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("📂 File path:", req.file.path);

    // 2. Read PDF from disk (since you used diskStorage)
    const pdfBuffer = fs.readFileSync(req.file.path);

    // 3. Extract text
    const data = await pdfParse(pdfBuffer);
    const resumeText = data.text;

    console.log("✅ Extracted Text Length:", resumeText.length);

    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({ error: "Empty resume content" });
    }

    // 4. AI Prompt
    const prompt = `
You are an expert interview assistant.

Candidate Resume:
${resumeText}

Question:
Tell me about yourself

Instructions:
- Answer professionally
- 5-6 lines
- Highlight skills + experience
`;

    // 5. AI Call
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const answer = completion.choices[0].message.content;

    console.log("🤖 AI Answer:", answer);

    // 6. Send response
    res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("❌ ERROR:", error.message);

    res.status(500).json({
      error: "Resume processing failed",
    });
  }
};
