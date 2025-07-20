import { useRef, useState } from "react";
import { extractPdf } from "../service/extractPdf";
import axios from "axios";

export function useViewDoc() {
  const [fileName, setFileName] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    console.log("Extracting PDF:", formData);

    try {
      const response = await axios.post("http://localhost:8080/api/v1/pdf", formData)
      console.log("PDF extraction response:", response.data);
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setPdfUrl(url);

      const reader = new FileReader();

      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setProgress(percent);
        }
      };

      reader.onloadend = () => setProgress(100);

      reader.readAsDataURL(file);
    } catch (error) {}
  }

  return {
    fileName,
    progress,
    handleFile,
    pdfUrl,
    setPdfUrl,
  };
}
