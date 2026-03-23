import InterviewResult from "../models/InterviewResult.js";

export const saveInterviewResult = async (data) => {
  return InterviewResult.create(data);
};

export const getUserResults = async (userId) => {
  return InterviewResult.find({ userId }).sort({ createdAt: -1 });
};
