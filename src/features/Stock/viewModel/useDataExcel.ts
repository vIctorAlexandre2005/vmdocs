import { useContextAsyncDialog } from "@/shared/contexts/AsyncDialogContext";
import { createMachineService, getDataExcelById } from "../service/dataExcel";
import { useState } from "react";
import { ExcelData, StockDataSend } from "../model/Stock";
import { errorToast } from "@/shared/utils/toasts";
import { useContextStock } from "@/shared/contexts/StockContext";

export function useDataExcel() {
  const { excelData, setExcelData } = useContextStock();
  const [tableDataById, setTableDataById] = useState<ExcelData>(
    {} as ExcelData
  );
  const [loadingDataById, setLoadingDataById] = useState(true);

  async function createMachine(data: StockDataSend) {
    try {
      const response = await createMachineService(data);
      setExcelData([...excelData, response]);
    } catch (error) {
      console.error(error);
      errorToast("Erro ao buscar dados");
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

  console.log("tableDataById", tableDataById);

  return {
    loadingDataById,
    tableDataById,
    getDataById,
    createMachine
  };
}
