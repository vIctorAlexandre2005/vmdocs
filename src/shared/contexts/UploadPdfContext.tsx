import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export interface DataExtractedPdfProps {
  inc_req: string;
  collaborator: string;
  registration: string;
  patrimony: string;
  pageNumber: number;
}

export interface DataPdfProps {
  id: number;
  file_name: string;
  inc_req: string;
  registration: string;
  collaborator: string;
  created_at: string;
  last_change: string;
  pdf_file: string;
}

type UploadPdfContextType = {
  fileName: string;
  setFileName: Dispatch<SetStateAction<string>>;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
  pdfUrl: string | null;
  setPdfUrl: Dispatch<SetStateAction<string | null>>;
  dataExtractedPdf: DataExtractedPdfProps[] | undefined;
  setDataExtractedPdf: Dispatch<
    SetStateAction<DataExtractedPdfProps[] | undefined>
  >;
  openDialogViewPdf: boolean;
  setOpenDialogViewPdf: (open: boolean) => void;
  filePdf: File | undefined;
  setFilePdf: Dispatch<SetStateAction<File | undefined>>;
  dataPdf: DataPdfProps[];
  setDataPdf: Dispatch<SetStateAction<DataPdfProps[]>>;

  selectedPdfExtracted: DataExtractedPdfProps | null;
  setSelectedPdfExtracted: Dispatch<
    SetStateAction<DataExtractedPdfProps | null>
  >;

  loadingReaderPdf: boolean;
  setLoadingReaderPdf: Dispatch<SetStateAction<boolean>>;
  incReq: string;
  setIncReq: Dispatch<SetStateAction<string>>;
  collaborator: string;
  setCollaborator: Dispatch<SetStateAction<string>>;
  registration: string;
  setRegistration: Dispatch<SetStateAction<string>>;
  patrimony: string;
  setPatrimony: Dispatch<SetStateAction<string>>;
};

const UploadPdfContext = createContext<UploadPdfContextType | undefined>(
  undefined
);

export function UploadPdfProvider({ children }: { children: ReactNode }) {
  const [fileName, setFileName] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [dataExtractedPdf, setDataExtractedPdf] =
    useState<DataExtractedPdfProps[] | undefined>([]);
  const [selectedPdfExtracted, setSelectedPdfExtracted] =
    useState<DataExtractedPdfProps | null>(null);
  const [openDialogViewPdf, setOpenDialogViewPdf] = useState(false);
  const [filePdf, setFilePdf] = useState<File>();
  const [dataPdf, setDataPdf] = useState<DataPdfProps[]>([]);

  const [loadingReaderPdf, setLoadingReaderPdf] = useState(false);

    const [incReq, setIncReq] = useState<string>("");
    const [collaborator, setCollaborator] = useState<string>("");
    const [registration, setRegistration] = useState<string>("");
    const [patrimony, setPatrimony] = useState<string>("");

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
        dataPdf,
        setDataPdf,
        loadingReaderPdf,
        setLoadingReaderPdf,
        selectedPdfExtracted,
        setSelectedPdfExtracted,
        collaborator,
        setCollaborator,
        incReq,
        setIncReq,
        registration,
        setRegistration,
        patrimony,
        setPatrimony
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
