import { api } from "@/shared/utils/api";
import { ExcelData, StockDataSend, StockDataUpdate } from "../model/Stock";

export async function createMachineService(data: StockDataSend) {
  try {
    const response = await api.post("/stock", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}


export async function updateMachineService(id: number,data: StockDataUpdate) {
  console.log("data", data);
  try {
    const response = await api.put(`/stock/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getDataExcel(page: number) {
  try {
    const response = await api.get(`/stock?size=10&page=${page}&sort=id,desc`);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getDataExcelById(id: number) {
  try {
    const response = await api.get(`/stock/${id}`);
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteMachineService(id: number) {
  try {
    const response = await api.delete(`/stock/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}
