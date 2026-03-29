import {
  saveInterviewResult,
  getUserResults,
} from "../repositories/interviewRepository.js";

export const saveResultService = async (userId, qaList, aiResults) => {
  const formatted = qaList.map((item, index) => ({
    question: item.question,
    answer: item.answer,
    score: aiResults[index].score,
    feedback: aiResults[index].feedback,
  }));

  return saveInterviewResult({
    userId,
    results: formatted,
  });
};

export const getResultsService = async (userId) => {
  return getUserResults(userId);
};

export const evaluateBatch = async (qaList) => {
  return qaList.map(({ question, answer }) => {
    let score = 5;

    if (answer.length > 50) score += 2;
    if (answer.toLowerCase().includes("example")) score += 1;
    if (answer.split(" ").length > 20) score += 2;

    return {
      score,
      feedback:
        score > 7 ? "Strong answer" : "Needs improvement, add more depth",
    };
  });
};