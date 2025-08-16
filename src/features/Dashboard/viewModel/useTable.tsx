import {
  DataPdfProps,
  useUploadPdfContext,
} from "@/shared/contexts/UploadPdfContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useEffect, useMemo, useState } from "react";
import { useTableDashboardContext } from "@/shared/contexts/TableDashboard";
import { stringifyObject } from "@/shared/utils/stringIfObject";

export function useTable() {
  const { dataPdf, pdfUrl, setPdfUrl } = useUploadPdfContext();
  const { filteredData, setFilteredData } = useTableDashboardContext();
  const [valueFilter, setValueFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState(valueFilter);

  // debounce → espera 300ms após digitação
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(valueFilter);
    }, 300);

    return () => clearTimeout(handler);
  }, [valueFilter]);

  const filtered1 = useMemo(() => {
    if (!debouncedFilter) return dataPdf;
    const search = debouncedFilter.toLowerCase();

    return dataPdf
      .map((pdf) => {
        // filtra as páginas do pdf
        const filteredPages = pdf.pages.filter((page) =>
          stringifyObject(page).toLowerCase().includes(search)
        );

        // verifica se o próprio PDF bateu OU alguma página bateu
        const pdfMatches = stringifyObject({
          ...pdf,
          pages: undefined, // ignora páginas aqui, pq já tratamos separado
        })
          .toLowerCase()
          .includes(search);

        if (pdfMatches) {
          // se o match for no PDF (ex: nome do arquivo), mantém todas as páginas
          return pdf;
        }

        if (filteredPages.length > 0) {
          // se só páginas bateram, retorna PDF com páginas reduzidas
          return {
            ...pdf,
            pages: filteredPages,
          };
        }

        return null;
      })
      .filter(Boolean); // remove nulos
  }, [dataPdf, debouncedFilter]);

  // memoiza lista filtrada
  const filtered = useMemo(() => {
    if (!debouncedFilter) return dataPdf;
    const search = debouncedFilter.toLowerCase();
    return dataPdf.filter((item) =>
      stringifyObject(item).toLowerCase().includes(search)
    );
  }, [dataPdf, debouncedFilter]);

  // sincroniza com contexto
  useEffect(() => {
    setFilteredData(filtered1 as DataPdfProps[]);
  }, [filtered, filtered1, setFilteredData]);

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
