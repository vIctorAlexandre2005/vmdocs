import axios from "axios";

export async function extractPdf(token: string | null, formData: FormData) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/pdf/reader`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
}
