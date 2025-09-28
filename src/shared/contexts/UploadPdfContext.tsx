import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

export interface DataExtractedPdfProps {
  page_number: number;
  incident_request: string;
  collaborator: string;
  registration: string;
  patrimony: string;
  group: string;
  vp: string;
  uo: string;
  company: string;
  location: string;
  manager: string;
  brand_model: string;
  type_of_movement: string;
  type_of_equipment_delivery: string;
  returned_equipment: string;
}

export interface DataPdfProps {
  id: number;
  user_id: number;
  file_name: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  pdf_file: string;
  pages: DataExtractedPdfProps[];
  __filteredPages: DataExtractedPdfProps[];
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

  formDataByPage: DataExtractedPdfProps[];
  setFormDataByPage: Dispatch<SetStateAction<DataExtractedPdfProps[]>>;

  errorExtractDataPdf: boolean;
  setErrorExtractDataPdf: Dispatch<SetStateAction<boolean>>;

  updateField: (
    pageIdx: number,
    field: keyof DataExtractedPdfProps,
    value: string
  ) => void;
};

const UploadPdfContext = createContext<UploadPdfContextType | undefined>(
  undefined
);

export function UploadPdfProvider({ children }: { children: ReactNode }) {
  const [fileName, setFileName] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [dataExtractedPdf, setDataExtractedPdf] = useState<
    DataExtractedPdfProps[] | undefined
  >([]);
  const [selectedPdfExtracted, setSelectedPdfExtracted] =
    useState<DataExtractedPdfProps | null>(null);
  const [openDialogViewPdf, setOpenDialogViewPdf] = useState(false);
  const [filePdf, setFilePdf] = useState<File>();
  const [dataPdf, setDataPdf] = useState<DataPdfProps[]>([]);

  const [loadingReaderPdf, setLoadingReaderPdf] = useState(false);

  const [formDataByPage, setFormDataByPage] = useState<DataExtractedPdfProps[]>(
    []
  );

  const [errorExtractDataPdf, setErrorExtractDataPdf] = useState(false);

  function updateField(
    pageIdx: number,
    field: keyof DataExtractedPdfProps,
    value: string
  ) {
    setFormDataByPage((prev) =>
      prev.map((item, idx) =>
        idx === pageIdx ? { ...item, [field]: value } : item
      )
    );
  }

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
        formDataByPage,
        setFormDataByPage,
        updateField,
        errorExtractDataPdf,
        setErrorExtractDataPdf
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
