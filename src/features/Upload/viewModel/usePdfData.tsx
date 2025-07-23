import { useUploadPdfContext } from "@/shared/contexts/UploadPdfContext";
import { createPdf } from "../service/pdfData";
import { useViewDoc } from "./useViewDoc";

export function usePdfData() {
  const { filePdf } = useUploadPdfContext();

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

  return {
    createDataPdf,
  };
}
