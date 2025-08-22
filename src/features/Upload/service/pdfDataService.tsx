import { DataExtractedPdfProps } from "@/shared/contexts/UploadPdfContext";
import axios from "axios";
import { useRouter } from "next/router";

interface PayloadCreatePdf {
  file_name: string;
  pages: DataExtractedPdfProps[];
  pdf_file?: string;
}

export async function createPdf(
  token: string | null,
  payload: PayloadCreatePdf
) {
  try {
    const response = await axios.post(
      //`${process.env.NEXT_PUBLIC_API_URL_LOCAL}/v1/pdf/data`,
      `${process.env.NEXT_PUBLIC_API_URL}/v1/pdf/data`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response em pdfDataService: ", response);
    return response;
  } catch (error: any) {
    console.error("Failed to extract PDF: " + error.message);
  }
}

export async function getDataPdfService(token: string) {
  const response = await axios.post("/api/getDataPdf", { token: token });
  return response.data.content;
}

export async function updateDataPdfService(
  token: string | null,
  id: number,
  payload: PayloadCreatePdf,
) {
  try {
    const response = await axios.post(`/api/updateDataPdf`, {
      token: token,
      id: id,
      payload: payload,
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to extract PDF: " + error.message);
    throw new Error(error.message);
  }
}

export async function deleteDataPdfService(token: string | null, id: number) {
  try {
    const response = await axios.post(`/api/deleteDataPdf`, {
      token: token,
      id: id,
    });
    return response;
  } catch (error: any) {
    console.error("Failed to extract PDF: " + error.message);
    throw new Error(error.message);
  }
}
