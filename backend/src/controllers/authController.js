import { asyncHandler } from "../core/asyncHandler.js";
import { HttpError } from "../core/httpException.js";

import {
  registerService,
  loginService,
  getMeService,
} from "../services/authService.js";

/*
  REGISTER USER
*/
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // 🔥 Input Validation
  if (!name || !email || !password) {
    throw new HttpError(400, "All fields are required");
  }

  if (password.length < 6) {
    throw new HttpError(400, "Password must be at least 6 characters");
  }

  // 🔥 Normalize input
  const normalizedEmail = email.toLowerCase().trim();

  const user = await registerService({
    name: name.trim(),
    email: normalizedEmail,
    password,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

/*
  LOGIN USER
*/
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 🔥 Validation
  if (!email || !password) {
    throw new HttpError(400, "Email and password are required");
  }

  const result = await loginService({
    email: email.toLowerCase().trim(),
    password,
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

/*
  GET CURRENT USER
*/
export const getMe = asyncHandler(async (req, res) => {
  if (!req.user?.id) {
    throw new HttpError(401, "Unauthorized");
  }

  const user = await getMeService(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
