import mongoose from "mongoose";

const interviewResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  results: [
    {
      question: String,
      answer: String,
      score: Number,
      feedback: String,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("InterviewResult", interviewResultSchema);
