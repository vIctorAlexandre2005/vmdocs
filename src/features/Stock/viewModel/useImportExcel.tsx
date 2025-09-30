import { errorToast } from "@/shared/utils/toasts";
import { useRef } from "react";

export function useImportExcel() {
  const inputRef = useRef<HTMLInputElement>(null);
  function handleOpenFileDialog() {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  }
  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e?.target?.files?.[0];
    if (!file?.type.includes(".xlsx")) {
      errorToast("Apenas arquivos .xlsx!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
  }

  return { inputRef, handleOpenFileDialog, handleFile };
}
