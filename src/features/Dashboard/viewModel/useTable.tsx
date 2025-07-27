import { useUploadPdfContext } from "@/shared/contexts/UploadPdfContext";
import { useEffect } from "react";

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
  };

  return { dataPdf, pdfUrl, convertBase64ToPdf };
}
