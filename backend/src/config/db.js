import mongoose from "mongoose";
import { ENV } from "./env.js";

const connectDB = async () => {
  try {
    console.log("Connecting to:", ENV.DATABASE_URI);

    await mongoose.connect(ENV.DATABASE_URI);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
