import {
  DataPdfProps,
  useUploadPdfContext,
} from "@/shared/contexts/UploadPdfContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function useTable() {
  const { dataPdf, pdfUrl, setPdfUrl } = useUploadPdfContext();

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

  function exportDataExcel(data: DataPdfProps[]) {
    const exportData = data.map(
      ({ file_name, collaborator, inc_req, registration, created_at }) => ({
        "Nome do arquivo": file_name,
        "Colaborador": collaborator,
        "Incidente/Requisição": inc_req,
        "Matricula": registration,
        "Data de criação": created_at,
      })
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

  return { dataPdf, pdfUrl, convertBase64ToPdf, exportDataExcel };
}
