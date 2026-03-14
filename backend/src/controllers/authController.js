import { loginService } from "../services/authService.js";
import { asyncHandler } from "../core/asyncHandler.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await loginService(email, password);

  res.json(result);
});
