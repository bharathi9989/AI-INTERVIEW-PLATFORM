import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fileName: String,
  fileUrl: String,
  extractedText: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Resume", resumeSchema);
