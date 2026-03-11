import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  plan: {
    type: String,
    default: "free",
  },
  interviews_used: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("User", userSchema);
