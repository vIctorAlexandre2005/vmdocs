import axios from "axios";

export async function extractPdf(token: string | null, formData: FormData) {

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/pdf/reader`,
      /* `${process.env.NEXT_PUBLIC_API_URL_LOCAL}/v1/pdf/reader`, */
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    console.error("Failed to extract PDF: " + error.message);
    throw new Error();
  }
}