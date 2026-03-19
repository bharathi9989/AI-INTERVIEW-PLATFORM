import mongoose from "mongoose";
import { ENV } from "./env.js";
// connect to DB

const connectDB = async () => {
  try {

    await mongoose.connect(ENV.DATABASE_URI);

    // for debuging purpose
    console.log("MongoDB connected");

    // if exist error its showes this
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
