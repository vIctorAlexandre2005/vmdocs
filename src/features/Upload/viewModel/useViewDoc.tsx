import { useEffect, useRef, useState } from "react";
import { extractPdf } from "../service/extractPdf";
import axios from "axios";
import { createPdf } from "../service/pdfData";

export function useViewDoc() {
  const [fileName, setFileName] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [dataPdf, setDataPdf] = useState<any>([]);
  const [openDialogViewPdf, setOpenDialogViewPdf] = useState(false);

  const [filePdf, setFilePdf] = useState<File>();

  const inputRef = useRef<HTMLInputElement>(null);
  function handleOpenFileDialog() {
    if (inputRef.current) {
      inputRef.current.value = ""; // limpa valor anterior
      inputRef.current.click();
    }
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFilePdf(file); // ainda atualiza o state, se precisar usar em outro lugar

    const formData = new FormData();
    formData.append("file", file); // ← usa `file`, não `filePdf`

    try {
      const response = await extractPdf(formData);
      if (response.status === 200) {
        const extractedData = response.data;
        setDataPdf(extractedData);
        setOpenDialogViewPdf(true);

        const url = URL.createObjectURL(file);
        setPdfUrl(url);

        const reader = new FileReader();
        reader.onprogress = ({ loaded, total }) => {
          const progressPercent = Math.round((loaded / total) * 100);
          setProgress(progressPercent);
        };

        reader.onloadend = () => setProgress(100);
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Failed to extract PDF:", error);
    }
  }

  async function createDataPdf(incReq: string, collaborator: string, registration: string) {
    const data = {
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
  }

  return {
    fileName,
    progress,
    handleFile,
    dataPdf,
    pdfUrl,
    setPdfUrl,
    openDialogViewPdf,
    setOpenDialogViewPdf,

    filePdf,
    setFilePdf,

    inputRef,
    handleOpenFileDialog,

    createDataPdf
  };
}
