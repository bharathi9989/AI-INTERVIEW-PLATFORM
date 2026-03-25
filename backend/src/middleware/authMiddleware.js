import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

const authMiddleware = (req, res, next) => {
  try {
    // 🔥 FIX: Allow preflight requests
    if (req.method === "OPTIONS") {
      return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;
