import User from "../models/User.js";

export const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

export const createUser = async (data) => {
  return User.create(data);
};
