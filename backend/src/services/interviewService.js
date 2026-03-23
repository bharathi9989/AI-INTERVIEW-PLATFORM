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
