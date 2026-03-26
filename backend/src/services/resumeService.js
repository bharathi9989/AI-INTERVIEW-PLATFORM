import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse"); // ✅ correct way

export const processResumeService = async (filePath) => {
  const buffer = fs.readFileSync(filePath);

  const data = await pdfParse(buffer);

  const text = data.text;

  console.log("RESUME TEXT:", text.slice(0, 200));

  return {
    text,
  };
};
