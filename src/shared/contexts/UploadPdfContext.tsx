import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface DataExtractedPdfProps {
  inc_req: string;
  collaborator: string;
  registration: string;
}

type UploadPdfContextType = {
  fileName: string;
  setFileName: Dispatch<SetStateAction<string>>;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
  pdfUrl: string | null;
  setPdfUrl: Dispatch<SetStateAction<string | null>>;
  dataExtractedPdf: DataExtractedPdfProps | undefined;
  setDataExtractedPdf: Dispatch<
    SetStateAction<DataExtractedPdfProps | undefined>
  >;
  openDialogViewPdf: boolean;
  setOpenDialogViewPdf: (open: boolean) => void;
  filePdf: File | undefined;
  setFilePdf: Dispatch<SetStateAction<File | undefined>>;
};

const UploadPdfContext = createContext<UploadPdfContextType | undefined>(
  undefined
);

export function UploadPdfProvider({ children }: { children: ReactNode }) {
  const [fileName, setFileName] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [dataExtractedPdf, setDataExtractedPdf] =
    useState<DataExtractedPdfProps>();
  const [openDialogViewPdf, setOpenDialogViewPdf] = useState(false);
  const [filePdf, setFilePdf] = useState<File>();

  return (
    <UploadPdfContext.Provider
      value={{
        dataExtractedPdf,
        setDataExtractedPdf,
        fileName,
        setFileName,
        progress,
        setProgress,
        pdfUrl,
        setPdfUrl,
        openDialogViewPdf,
        setOpenDialogViewPdf,
        filePdf,
        setFilePdf,
      }}
    >
      {children}
    </UploadPdfContext.Provider>
  );
}

export function useUploadPdfContext() {
  const context = useContext(UploadPdfContext);
  if (!context)
    throw new Error(
      "useUploadPdfContext must be used within UploadPdfProvider"
    );
  return context;
}
