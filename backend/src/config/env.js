import dotenv from "dotenv";

dotenv.config();

// ENV file because security purpose its using a best way and avoid dublication just import ENV and invoke the method like object 

export const ENV = {
  DATABASE_URI: process.env.DATABASE_URI,
  PORT: process.env.PORT || 2026,
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",
};
