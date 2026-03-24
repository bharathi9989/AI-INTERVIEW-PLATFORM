import express from "express";
import cors from "cors";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import { ENV } from "./src/config/env.js";
import resumeRoutes from "./src/routes/resumeRoutes.js";
import interviewRoutes from "./src/routes/interviewRoutes.js";
import analyticsRoutes from "./src/routes/analyticsRoutes.js";


// create server
const app = express();
// connected to DB
connectDB();

// client server communication purpose
app.use(cors());

// parse data in json type
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);


app.use("/api/interview", interviewRoutes);
app.use("/api/analytics", analyticsRoutes);

// listen the server in port
app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
  console.log("connected to DataBase");
});
