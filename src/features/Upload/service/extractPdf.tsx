import axios from "axios";

export async function extractPdf(file: File) {
  console.log("Extracting PDF:", file);
  try {
    const response = await axios.post("/api/extract-pdf", { file });
    console.log("PDF extraction response:", response.data);
    return response.data;
  } catch (error: any) {
    throw new Error("Failed to extract PDF: " + error.message);
  }
};
