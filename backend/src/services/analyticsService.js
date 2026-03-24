import InterviewResult from "../models/InterviewResult.js";

export const getAnalyticsService = async (userId) => {
  const data = await InterviewResult.find({ userId });

  let totalInterviews = data.length;
  let totalScore = 0;
  let totalQuestions = 0;
  let bestScore = 0;

  data.forEach((attempt) => {
    attempt.results.forEach((r) => {
      totalScore += r.score;
      totalQuestions++;

      if (r.score > bestScore) {
        bestScore = r.score;
      }
    });
  });

  const averageScore = totalQuestions
    ? (totalScore / totalQuestions).toFixed(1)
    : 0;

  return {
    totalInterviews,
    averageScore,
    bestScore,
  };
};
