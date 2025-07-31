import { useRef, useState } from "react";
import { extractPdf } from "../service/extractPdf";
import { useUploadPdfContext } from "@/shared/contexts/UploadPdfContext";
import { useUserContext } from "@/shared/contexts/UserContext";

export function useViewDoc() {
 const { user } = useUserContext(); 
 const {
    fileName,
    setFileName,
    progress,
    setProgress,
    pdfUrl,
    setPdfUrl,
    dataExtractedPdf,
    setDataExtractedPdf,
    openDialogViewPdf,
    setOpenDialogViewPdf,
    filePdf,
    setFilePdf,
    loadingReaderPdf,
    setLoadingReaderPdf
  } = useUploadPdfContext();

  const inputRef = useRef<HTMLInputElement>(null);
  function handleOpenFileDialog() {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFilePdf(file);

    const formData = new FormData();
    formData.append("file", file);
    setLoadingReaderPdf(true);
    try {
      const response = await extractPdf(user, formData);
      if (response?.status === 200) {
        const extractedData = response.data;
        setDataExtractedPdf(extractedData);
        setFileName(file.name);

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
    } finally {
      setLoadingReaderPdf(false);
    }
  }

  return {
    fileName,
    progress,
    handleFile,
    dataExtractedPdf,
    pdfUrl,
    setPdfUrl,
    openDialogViewPdf,
    setOpenDialogViewPdf,

    filePdf,
    setFilePdf,

    inputRef,
    handleOpenFileDialog,

    loadingReaderPdf
  };
}
