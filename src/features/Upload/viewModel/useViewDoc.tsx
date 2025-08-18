import { useEffect, useRef, useState } from "react";
import { extractPdf } from "../service/extractPdf";
import {
  DataExtractedPdfProps,
  useUploadPdfContext,
} from "@/shared/contexts/UploadPdfContext";
import { useUserContext } from "@/shared/contexts/UserContext";

export function useViewDoc() {
  const { token } = useUserContext();
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
    setLoadingReaderPdf,
    formDataByPage,
    setFormDataByPage,
    updateField,
    errorExtractDataPdf,
    setErrorExtractDataPdf
  } = useUploadPdfContext();

  const [expand, setExpand] = useState<number | null>(null);

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
    setFileName(file.name);
    setOpenDialogViewPdf(true);
    setLoadingReaderPdf(true);
    try {
      const response = await extractPdf(token, formData);
      if (response?.status === 200) {
        const extractedData = response.data;
        setDataExtractedPdf(extractedData);

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
      setErrorExtractDataPdf(true);
      console.error("Failed to extract PDF:", error);
    } finally {
      setLoadingReaderPdf(false);
    }
  }

  function expandPageData(idx: number) {
    setExpand(idx);
  }

  useEffect(() => {
    if (dataExtractedPdf) {
      setFormDataByPage(dataExtractedPdf);
    }
  }, [dataExtractedPdf]);

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

    loadingReaderPdf,
    expand,
    setExpand,
    expandPageData,
    updateField,
    formDataByPage,
    setFormDataByPage,
    errorExtractDataPdf,
  };
}
