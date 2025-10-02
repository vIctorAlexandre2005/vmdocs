import { api } from "@/shared/utils/api";

export async function getDataExcel(page: number) {
  try {
    const response = await api.get(`/stock?size=10&page=${page}&sort=id,desc`);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}
