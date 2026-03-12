import { asyncHandler } from "../core/asyncHandler.js";
import { HttpError } from "../core/httpException.js";
import User from "../config/db.js";

import bcrypt from "bcryptjs";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new HttpError(400, "All Fields are Required");
  }

  const existUser = await User.findOne({ email });

  if (existUser) {
    throw new HttpError(400, "User Already Exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  res.status(201).json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});
