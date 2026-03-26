import fs from "fs";

export const processResumeService = async (filePath) => {
  const buffer = fs.readFileSync(filePath);

  const pdfParse = (await import("pdf-parse")).default;

  const data = await pdfParse(buffer);

  const text = data.text;

  console.log("RESUME TEXT:", text.slice(0, 200));

  return {
    text,
  };
};
