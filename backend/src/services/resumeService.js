import fs from "fs";

export const processResumeService = async (filePath) => {
  try {
    // 🔥 validate file
    if (!filePath) {
      throw new Error("File path missing");
    }

    // 🔥 read file
    const buffer = fs.readFileSync(filePath);

    // 🔥 dynamic import (ESM fix)
    const pdfParse = (await import("pdf-parse")).default;

    // 🔥 parse
    const data = await pdfParse(buffer);

    const text = data.text;

    if (!text) {
      throw new Error("Failed to extract text from PDF");
    }

    console.log("TEXT PREVIEW:", text.slice(0, 100));

    return {
      text,
      message: "Resume processed successfully",
    };
  } catch (error) {
    console.error("RESUME ERROR:", error);
    throw error;
  }
};
