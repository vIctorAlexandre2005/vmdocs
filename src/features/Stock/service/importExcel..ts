import { api } from "@/shared/utils/api";

export async function importExcel(formData: FormData, number: number) {
  try {
    const response = await api.post(
      `/stock/upload?size=10&page=${number}`,
      formData
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}
