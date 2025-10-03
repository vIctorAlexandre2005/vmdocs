import { DataExtractedPdfProps } from "@/shared/contexts/UploadPdfContext";
import { api } from "@/shared/utils/api";
import axios from "axios";
import { useRouter } from "next/router";

interface PayloadCreatePdf {
  file_name: string;
  pdf_file?: string;
  pages: DataExtractedPdfProps[];
}

export async function createPdf(
  token: string | null,
  payload: PayloadCreatePdf
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/pdf/data`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response CREATE PDF: ", response);
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getDataPdfService(page: number) {
  const response = await api.get(
    `/v1/pdf/data?page=${page}&size=1&sort=id,desc`
  );
  return response.data;
}

export async function updateDataPdfService(
  token: string | null,
  id: number,
  payload: { pages: DataExtractedPdfProps[] }
) {
  try {
    const response = await axios.post(`/api/updateDataPdf`, {
      token: token,
      id: id,
      payload: payload,
    });
    return response.data;
  } catch (error: any) {
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
    throw new Error(error.message);
  }
}
