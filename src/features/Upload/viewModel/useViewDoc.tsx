import { useRef, useState } from "react";

export function useViewDoc() {
  const [fileName, setFileName] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setProgress(percent);
      }
    };

    reader.onloadend = () => setProgress(100);

    reader.readAsDataURL(file);
  };

  return {
    fileName,
    progress,
    handleFile,
  };
}
