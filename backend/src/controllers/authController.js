import { loginService } from "../services/authService.js";
import { asyncHandler } from "../core/asyncHandler.js";


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
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await loginService(email, password);

  res.json(result);
});
