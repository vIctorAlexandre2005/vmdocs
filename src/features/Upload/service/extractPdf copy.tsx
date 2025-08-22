import axios from "axios";

export async function extractPdf(token: string | null, formData: FormData) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/pdf/reader",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
}
