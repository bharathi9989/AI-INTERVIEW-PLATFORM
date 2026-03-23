import OpenAI from "openai";

// intiate open AI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Question Generate prompt
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

export const evaluateAnswer = async (question, answer) => {
  const prompt = `
You are a senior technical interviewer.

Evaluate the candidate's answer.

Question:
${question}

Candidate Answer:
${answer}

Evaluate based on:
- correctness
- depth
- clarity

Return JSON:

{
  "score": number (0-10),
  "feedback": "...",
  "improvement": "...",
  "correctAnswer": "..."
}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0].message.content;

  try {
    return JSON.parse(content);
  } catch {
    throw new Error("AI parsing failed");
  }
};

export const evaluateBatch = async (qaList) => {
  const formatted = qaList
    .map(
      (item, index) => `
Q${index + 1}: ${item.question}
A${index + 1}: ${item.answer}
`,
    )
    .join("\n");

  const prompt = `
You are a senior technical interviewer.

Evaluate the following question-answer pairs.

${formatted}

Return JSON format:

{
  "results": [
    {
      "score": number (0-10),
      "feedback": "...",
      "improvement": "..."
    }
  ]
}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0].message.content;

  try {
    return JSON.parse(content);
  } catch {
    throw new Error("Batch AI parsing failed");
  }
};

