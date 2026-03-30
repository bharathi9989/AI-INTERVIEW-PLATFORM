import fs from "fs";

export const processResumeService = async (filePath) => {
  try {
    if (!filePath) {
      throw new Error("File path missing");
    }

    // read file buffer
    const buffer = fs.readFileSync(filePath);

    // 🔥 FIX: require-style import inside ESM
    const pdfParse = (await import("pdf-parse")).default;

    if (typeof pdfParse !== "function") {
      throw new Error("pdfParse not loaded correctly");
    }

    const data = await pdfParse(buffer);

    const text = data.text;

    if (!text) {
      throw new Error("No text extracted from PDF");
    }

    console.log("✅ TEXT EXTRACTED:", text.slice(0, 100));

    return {
      text,
      message: "Resume processed successfully",
    };
  } catch (error) {
    console.error("❌ RESUME SERVICE ERROR:", error.message);
    throw new Error("Resume processing failed: " + error.message);
  }
};
