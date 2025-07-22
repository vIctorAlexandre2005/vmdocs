import { useRef, useState } from "react";
import { extractPdf } from "../service/extractPdf";
import axios from "axios";

export function useViewDoc() {
  const [fileName, setFileName] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [dataPdf, setDataPdf] = useState<any>([]);
  const [openDialogViewPdf, setOpenDialogViewPdf] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await extractPdf(formData);
      if (response.status === 200) {
        const extractedData = response.data;
        setDataPdf(extractedData);
        setOpenDialogViewPdf(true);

        //setFileName(file.name);
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

  return {
    fileName,
    progress,
    handleFile,
    dataPdf,
    pdfUrl,
    setPdfUrl,
    openDialogViewPdf,
    setOpenDialogViewPdf,
  };
}
