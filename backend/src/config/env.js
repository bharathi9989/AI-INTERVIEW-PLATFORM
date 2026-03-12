// src/config/env.js
import dotenv from "dotenv";
dotenv.config();

if (!process.env.DATABASE_URI) {
  throw new Error("DATABASE_URL is missing");
}

export const ENV = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",

};
