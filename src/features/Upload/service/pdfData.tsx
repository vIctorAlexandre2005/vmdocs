import axios from "axios";

export async function extractPdf(formData: FormData) {
  console.log("Extracting PDF:", formData);
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/pdf/reader",
      formData
    );
    console.log("Extracted PDF data:", response.data);
    return response;
  } catch (error: any) {
    throw new Error("Failed to extract PDF: " + error.message);
  }
}
