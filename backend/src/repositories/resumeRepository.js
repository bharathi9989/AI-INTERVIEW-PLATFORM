import Resume from "../models/Resume.js";

export const createResume = async (data) => {
  return Resume.create(data);
};
