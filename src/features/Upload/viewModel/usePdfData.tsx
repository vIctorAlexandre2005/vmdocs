import { useUploadPdfContext } from "@/shared/contexts/UploadPdfContext";
import { createPdf, getDataPdfService } from "../service/pdfData";
import { useEffect } from "react";

export function usePdfData() {
  const { filePdf, dataPdf, setDataPdf, progress, setProgress } = useUploadPdfContext();

  async function createDataPdf(
    filename: string,
    incReq: string,
    collaborator: string,
    registration: string
  ) {
    const data = {
      file_name: filename,
      inc_req: incReq,
      collaborator: collaborator,
      registration: registration,
      pdf_file: filePdf,
    };
    const formData = new FormData();
    try {
      const response = await createPdf(data, formData);
      if (response.status === 200) {
        console.log("PDF data created successfully:", response.data);
      }
    } catch (error) {
      console.error("Failed to create PDF data:", error);
    }
  };

  async function getDataPdf() {
    try {
      const response = await getDataPdfService();
      console.log("PDF data retrieved successfully:", response);
      setDataPdf(response);
      setProgress(100); // Assuming the progress is 100% after fetching data
    } catch (error) {
      console.error("Failed to create PDF data:", error);
    }
  };

  useEffect(() => {
    getDataPdf();
  }, []);

  return {
    createDataPdf,
    getDataPdf,
    dataPdf,
    setDataPdf,
    progress, setProgress
  };
}
