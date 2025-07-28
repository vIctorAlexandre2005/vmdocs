import { useUploadPdfContext } from "@/shared/contexts/UploadPdfContext";
import {
  createPdf,
  deleteDataPdfService,
  getDataPdfService,
  updateDataPdfService,
} from "../service/pdfDataService";
import { useEffect } from "react";

export function usePdfData() {
  const { filePdf, dataPdf, setDataPdf, progress, setProgress } =
    useUploadPdfContext();

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
    } catch (error) {
      console.error("Failed to create PDF data:", error);
    }
  }

  async function getDataPdf() {
    try {
      const response = await getDataPdfService();
      setDataPdf(response);
      setProgress(100); // Assuming the progress is 100% after fetching data
    } catch (error) {
      console.error("Failed to create PDF data:", error);
    }
  }

  useEffect(() => {
    getDataPdf();
  }, []);

  async function updateDataPdf(
    id: number,
    pdf_file: string,
    inc_req: string,
    collaborator: string,
    registration: string
  ) {
    const formData = new FormData();
    try {
      const response = await updateDataPdfService(
        id,
        pdf_file,
        inc_req,
        collaborator,
        registration,
        formData
      );
    } catch (error) {
      console.error("Failed to update PDF data:", error);
    }
  }

  async function deleteDataPdf(id: number) {
    try {
      await deleteDataPdfService(id);
    } catch (error) {
      console.error("Failed to delete PDF data:", error);
    }
  }

  return {
    createDataPdf,
    getDataPdf,
    dataPdf,
    setDataPdf,
    progress,
    setProgress,
    updateDataPdf,
    deleteDataPdf
  };
}
