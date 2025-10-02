import { useContextAsyncDialog } from "@/shared/contexts/AsyncDialogContext";
import { getDataExcelById } from "../service/getDataExcel";
import { useState } from "react";
import { ExcelData } from "../model/Stock";
import { errorToast } from "@/shared/utils/toasts";

export function useDataExcel() {
  const [tableDataById, setTableDataById] = useState<ExcelData>(
    {} as ExcelData
  );
  const [loadingDataById, setLoadingDataById] = useState(true);

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
  };
}
