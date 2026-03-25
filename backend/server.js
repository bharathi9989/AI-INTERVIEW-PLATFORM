import express from "express";
import cors from "cors";

import connectDB from "./src/config/db.js";
import { ENV } from "./src/config/env.js";

import authRoutes from "./src/routes/authRoutes.js";
import resumeRoutes from "./src/routes/resumeRoutes.js";
import interviewRoutes from "./src/routes/interviewRoutes.js";
import analyticsRoutes from "./src/routes/analyticsRoutes.js";

const app = express();

// ✅ Connect DB
connectDB();

// =====================================================
// 🔥 GLOBAL CORS + PREFLIGHT HANDLER (CRITICAL)
// =====================================================
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // ✅ Fix preflight
  }

  next();
});

// =====================================================
// 🔥 CORS MIDDLEWARE (KEEP SIMPLE)
// =====================================================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// =====================================================
// 🔥 BODY PARSER
// =====================================================
app.use(express.json());

// =====================================================
// 🔥 DEBUG LOGGER (REMOVE IN PROD)
// =====================================================
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// =====================================================
// 🔥 ROUTES
// =====================================================
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/analytics", analyticsRoutes);

// =====================================================
// 🔥 HEALTH CHECK (OPTIONAL)
// =====================================================
app.get("/", (req, res) => {
  res.send("API is running...");
});

// =====================================================
// 🔥 GLOBAL ERROR HANDLER (SDE LEVEL)
// =====================================================
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// =====================================================
// 🔥 START SERVER
// =====================================================
app.listen(ENV.PORT, () => {
  console.log(`🚀 Server running on port ${ENV.PORT}`);
});
