import OpenAI from "openai";
import { ENV } from "../config/env.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateQuestions = async (resumeText) => {
  const prompt = `
You are a senior technical interviewer.

Analyze the following resume and generate exactly 10 high-quality interview questions.

Rules:
- Questions must be based on the candidate's skills
- Mix of easy, medium, hard
- Include:
  - conceptual
  - coding
  - system design
  - behavioral

Return JSON format:

{
  "questions": [
    {
      "question": "...",
      "type": "...",
      "difficulty": "..."
    }
  ]
}

Resume:
${resumeText}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0].message.content;

  return JSON.parse(content);
};
