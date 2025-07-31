import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { InputComponent } from "@/shared/components/InputComponent";
import { Dispatch } from "react";
import { LuSend } from "react-icons/lu";
import { ClipLoader } from "react-spinners";

interface FormDataPdfProps {
  collaborator: string;
  registration: string;
  incReq: string;
  fileName: string;
  createDataPdf: (
    filename: string,
    incReq: string,
    collaborator: string,
    registration: string
  ) => void;
  setCollaborator: Dispatch<React.SetStateAction<string>>;
  setRegistration: Dispatch<React.SetStateAction<string>>;
  setIncReq: Dispatch<React.SetStateAction<string>>;
  loadingCreatePdf: boolean;
  setOpenDialogViewPdf: (open: boolean) => void;
}

export function FormDataPdf({
  collaborator,
  registration,
  incReq,
  fileName,
  createDataPdf,
  setCollaborator,
  setRegistration,
  setIncReq,
  loadingCreatePdf,
  setOpenDialogViewPdf,
}: FormDataPdfProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <InputComponent
        className="w-full p-2"
        value={collaborator}
        onChange={(e) => setCollaborator(e.target.value)}
        label="Nome do colaborador"
      />
      <InputComponent
        value={registration}
        className="w-full p-2"
        onChange={(e) => setRegistration(e.target.value)}
        label="Matrícula"
      />
      <InputComponent
        value={incReq}
        className="w-full p-2"
        onChange={(e) => setIncReq(e.target.value)}
        label="Incidente/Requisição"
      />
      <ButtonComponent
        text="Enviar"
        type="submit"
        className="items-baseline text-base font-bold transition duration-300 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        icon={<LuSend size={20} />}
        loading={loadingCreatePdf}
        disabled={loadingCreatePdf}
        loaderIcon={<ClipLoader size={20} color="#fff" />}
        onClick={() => {
          createDataPdf(fileName, incReq, collaborator, registration);
        }}
      />
    </div>
  );
}
