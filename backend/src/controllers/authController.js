import { asyncHandler } from "../core/asyncHandler.js";

import {
  registerService,
  loginService,
  getMeService,
} from "../services/authService.js";

// REGISTER USER
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await registerService({
    name,
    email,
    password,
  });

  res.status(201).json({
    success: true,
    data: user,
  });
});

// LOGIN USER
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await loginService({
    email,
    password,
  });

  res.json({
    success: true,
    data: result,
  });
});

// GET CURRENT USER
export const getMe = asyncHandler(async (req, res) => {
  const user = await getMeService(req.user.id);

  res.json({
    success: true,
    data: user,
  });
});
