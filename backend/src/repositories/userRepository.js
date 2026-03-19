import User from "../models/User.js";
// user data retrive from data base 

export const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

export const createUser = async (data) => {
  return User.create(data);
};
