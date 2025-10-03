import { useContextAsyncDialog } from "@/shared/contexts/AsyncDialogContext";
import { createMachineService, deleteMachineService, getDataExcelById, updateMachineService } from "../service/dataExcel";
import { useState } from "react";
import { ExcelData, StockDataSend, StockDataUpdate } from "../model/Stock";
import { errorToast } from "@/shared/utils/toasts";
import { useContextStock } from "@/shared/contexts/StockContext";

export function useDataExcel() {
  const { excelData, setExcelData } = useContextStock();
  const [tableDataById, setTableDataById] = useState<ExcelData>(
    {} as ExcelData
  );
  const [loadingDataById, setLoadingDataById] = useState(true);
  const [loadingCreateMachine, setLoadingCreateMachine] = useState(false);

  async function createMachine(data: StockDataSend) {
    setLoadingCreateMachine(true);
    try {
      const response = await createMachineService(data);
      console.log("response", response);
      setExcelData([...excelData, response]);
    } catch (error) {
      console.error(error);
      errorToast("Erro ao buscar dados");
    } finally {
      setLoadingCreateMachine(false);
    }
  }

  async function getDataById(id: number) {
    try {
      const response = await getDataExcelById(id);
      setTableDataById(response?.data);
    } catch (error) {
      console.error(error);
      errorToast("Erro ao buscar dados");
    } finally {
      setLoadingDataById(false);
    }
  }

  async function updateMachine(id: number, data: StockDataUpdate) {
    console.log("DATA EM UPDATE", data);
    setLoadingCreateMachine(true);
    try {
      const response = await updateMachineService(id,data);
      setExcelData([...excelData, response]);
    } catch (error) {
      console.error(error);
      errorToast("Erro ao buscar dados");
    } finally {
      setLoadingCreateMachine(false);
    }
  }

  async function deleteMachine(id: number) {
    setLoadingCreateMachine(true);
    try {
      await deleteMachineService(id);
      setExcelData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      errorToast("Erro ao buscar dados");
    } finally {
      setLoadingCreateMachine(false);
    }
  }

  return {
    loadingDataById,
    tableDataById,
    getDataById,
    createMachine,
    loadingCreateMachine,
    updateMachine,
    deleteMachine
  };
}
