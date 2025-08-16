import {
  DataPdfProps,
  useUploadPdfContext,
} from "@/shared/contexts/UploadPdfContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useEffect, useMemo, useState } from "react";
import { useTableDashboardContext } from "@/shared/contexts/TableDashboard";

export function useTable() {
  const { dataPdf, pdfUrl, setPdfUrl } = useUploadPdfContext();
  const { filteredData, setFilteredData } = useTableDashboardContext();
  const [valueFilter, setValueFilter] = useState("");
const [debouncedFilter, setDebouncedFilter] = useState(valueFilter);

  // debounce → espera 300ms após digitação
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(valueFilter);
    }, 500);

    return () => clearTimeout(handler);
  }, [valueFilter]);

  // memoiza lista filtrada
  const filtered = useMemo(() => {
    if (!debouncedFilter) return dataPdf;
    const search = debouncedFilter.toLowerCase();
    return dataPdf.filter((item) =>
      item.file_name.toLowerCase().includes(search)
    );
  }, [dataPdf, debouncedFilter]);

  // sincroniza com contexto
  useEffect(() => {
    setFilteredData(filtered);
  }, [filtered, setFilteredData]);

  function convertBase64ToPdf(pdf_file: string) {
    const byteCharacters = atob(pdf_file);
    const byteNumbers = Array.from(byteCharacters).map((char) =>
      char.charCodeAt(0)
    );
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);

    return () => URL.revokeObjectURL(url);
  }

  function exportDataExcel(tableData: DataPdfProps[]) {
    const exportData = tableData.flatMap(
      ({ file_name, pages, last_change, created_at }) =>
        pages.map((page) => ({
          "Nome do arquivo": file_name,
          Colaborador: page.collaborator,
          "Incidente/Requisição": page.inc_req,
          Matrícula: page.registration,
          Patrimônio: page.patrimony,
          "Data de criação": created_at,
          "Última alteração": last_change,
        }))
    );

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const columnWidths = Object.keys(exportData[0]).map((key) => {
      const maxLength = Math.max(
        key.length,
        ...exportData.map((row: any) => String(row[key]).length)
      );
      return { wch: maxLength + 2 };
    });
    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Termos");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, "termos.xlsx");
  }

  return {
    dataPdf,
    pdfUrl,
    convertBase64ToPdf,
    exportDataExcel,
    filteredData,
    setFilteredData,
    valueFilter,
    setValueFilter,
    filtered,
  };
}
