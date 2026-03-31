// controllers/aiController.js

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAnswer = async (req, res) => {
  try {
    const { resumeText, question } = req.body;

    const prompt = `
    Based on this resume:
    ${resumeText}

    Answer this interview question:
    ${question}

    Give a professional answer.
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      answer: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI failed" });
  }
};
