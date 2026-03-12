import dotenv from "dotenv";

dotenv.config();


export const ENV = {
  DATABASE_URI: process.env.DATABASE_URI,
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",
};
