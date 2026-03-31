import pdfParse from "pdf-parse";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const uploadAndGenerate = async (req, res) => {
  try {
    // 1. Get PDF buffer
    const pdfBuffer = req.file.buffer;

    // 2. Extract text
    const data = await pdfParse(pdfBuffer);
    const resumeText = data.text;

    console.log("✅ Extracted Text:", resumeText);

    // 3. AI Prompt
    const prompt = `
You are an interview assistant.

Candidate Resume:
${resumeText}

Question:
Tell me about yourself

Generate a strong professional answer in 5-6 lines.
`;

    // 4. AI Call
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const answer = completion.choices[0].message.content;

    // 5. Send response
    res.json({ answer });
  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ error: "Failed to process resume" });
  }
};
