import Resume from "../models/Resume.js";

// creates resume datas
export const createResume = async (data) => {
  return Resume.create(data);
};
