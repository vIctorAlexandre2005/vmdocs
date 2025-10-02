import { useContextAsyncDialog } from "@/shared/contexts/AsyncDialogContext";
import { errorToast, successToast } from "@/shared/utils/toasts";
import { useEffect, useRef, useState } from "react";
import { importExcel } from "../service/importExcel.";
import { ExcelData } from "../model/Stock";
import { useContextStock } from "@/shared/contexts/StockContext";

export function useImportExcel() {
  const { execute, isLoading: loadingTableExcel } = useContextAsyncDialog();
  const { excelData, setExcelData, total_pages, setTotalPages } =
    useContextStock();
  const [openDialogImportExcel, setOpenDialogImportExcel] = useState(false);
  const [page, setPage] = useState(1);

  const inputRef = useRef<HTMLInputElement>(null);

  function handleOpenFileDialog() {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  }

  async function fetchExcelData(formData?: FormData | null, newPage?: number) {
    await execute(
      async () => {
        const response = await importExcel(
          formData ?? new FormData(),
          newPage ?? page
        );
        setExcelData(response?.content);
        setPage(response?.number);
        setTotalPages(response?.totalPages);
        return response;
      },
      {
        onError: (error) => {
          errorToast("Erro ao buscar dados do excel");
          console.error(error);
        },
      }
    );
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e?.target?.files?.[0];
    if (!file) return;
    /* if (
      file.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      errorToast("Apenas arquivos .xlsx!");
      return;
    } */

    const formData = new FormData();
    formData.append("excel", file);

    setOpenDialogImportExcel(true);

    await fetchExcelData(formData, 1);

    setOpenDialogImportExcel(false);
    successToast("Importado com sucesso!");
  }

  // 👉 sempre que a página mudar, busca os dados de novo
  useEffect(() => {
    if (page > 0) {
      fetchExcelData(null, page);
    }
  }, [page]);

  return {
    inputRef,
    handleOpenFileDialog,
    handleFile,
    loadingTableExcel,
    openDialogImportExcel,
    setOpenDialogImportExcel,
    excelData,
    total_pages,
    page,
    setPage,
  };
}
