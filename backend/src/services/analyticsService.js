import InterviewResult from "../models/InterviewResult.js";

export const getAnalyticsService = async (userId) => {
  const data = await InterviewResult.find({ userId });

  let totalInterviews = data.length;
  let totalScore = 0;
  let totalQuestions = 0;
  let bestScore = 0;

  const chartData = [];

  data.forEach((attempt, index) => {
    let attemptScore = 0;

    attempt.results.forEach((r) => {
      totalScore += r.score;
      totalQuestions++;
      attemptScore += r.score;

      if (r.score > bestScore) {
        bestScore = r.score;
      }
    });

    const avg = attempt.results.length
      ? (attemptScore / attempt.results.length).toFixed(1)
      : 0;

    chartData.push({
      name: `Attempt ${index + 1}`,
      score: Number(avg),
    });
  });

  const averageScore = totalQuestions
    ? (totalScore / totalQuestions).toFixed(1)
    : 0;

  return {
    totalInterviews,
    averageScore,
    bestScore,
    chartData,
  };
};
