import mongoose from "mongoose";
import { ENV } from "./env.js";

// Database
const connectDB = async () => {
  try {
    await mongoose.connect(ENV.DATABASE_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
