import axios from "axios";

export async function extractPdf(formData: FormData) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/pdf/reader",
      formData
    );
    return response;
  } catch (error: any) {
    console.error("Failed to extract PDF: " + error.message);
  }
}
