import express from "express";
import cors from "cors";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import { ENV } from "./src/config/env.js";
import resumeRoutes from "./src/routes/resumeRoutes.js";
import interviewRoutes from "./src/routes/interviewRoutes.js";
import analyticsRoutes from "./src/routes/analyticsRoutes.js";

const app = express();

// DB connect
connectDB();

// 🔥 CORS (FIRST)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// 🔥 JSON parser
app.use(express.json());

// 🔥 DEBUG (optional but useful)
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/analytics", analyticsRoutes);

// Server start
app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
  console.log("Connected to Database");
});
