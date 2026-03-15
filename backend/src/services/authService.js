import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { HttpError } from "../core/httpException.js";
import { findUserByEmail, createUser } from "../repositories/userRepository.js";

export const registerService = async ({ name, email, password }) => {
  // 1️⃣ check if user already exists
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new HttpError(400, "User already exists");
  }

  // 2️⃣ hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3️⃣ create user
  const newUser = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  // 4️⃣ return safe user data
  return {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  };
};



export const loginService = async ({ email, password }) => {
  // find user by email
  const user = await findUserByEmail(email);

  if (!user) {
    throw new HttpError(401, "Invalid email or password");
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new HttpError(401, "Invalid email or password");
  }

  // create JWT
  const token = jwt.sign({ id: user._id }, ENV.JWT_SECRET, { expiresIn: "7d" });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};



export const getMeService = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};