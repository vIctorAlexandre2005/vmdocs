import { useRef, useState } from "react";

export function useViewDoc() {
  const [fileName, setFileName] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

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
  }

  return {
    fileName,
    progress,
    handleFile,
    pdfUrl
  };
}
