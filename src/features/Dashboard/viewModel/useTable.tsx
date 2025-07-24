import { useUploadPdfContext } from "@/shared/contexts/UploadPdfContext";

export function useTable() {
    const { dataPdf } = useUploadPdfContext();
    return { dataPdf };
};