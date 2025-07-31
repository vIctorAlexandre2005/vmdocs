import { useTable } from "@/features/Dashboard/viewModel/useTable";
import { usePdfData } from "@/features/Upload/viewModel/usePdfData";
import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { InputComponent } from "@/shared/components/InputComponent";
import { Dispatch, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

interface UpdateDataPdfProps {
  id: number;
  registration: string;
  collaborator: string;
  inc_req: string;
  pdf_file: string;
  file_name: string;
  last_change: string;
  setOpenDialogViewPdf: Dispatch<React.SetStateAction<boolean>>;
}

export function UpdateDataPdf({
  id,
  collaborator,
  inc_req,
  registration,
  pdf_file,
  file_name,
  last_change,
  setOpenDialogViewPdf,
}: UpdateDataPdfProps) {
  const [updateRegistration, setUpdateRegistration] = useState<string>("");
  const [updateIncReq, setUpdateIncReq] = useState<string>("");
  const [updateCollaborator, setUpdateCollaborator] = useState<string>("");

  const { convertBase64ToPdf, pdfUrl } = useTable();
  const { updateDataPdf, loadingUpdateDataPdf } = usePdfData();

  const sameData =
    updateRegistration === registration &&
    updateIncReq === inc_req &&
    updateCollaborator === collaborator;

  useEffect(() => {
    convertBase64ToPdf(pdf_file);
    setUpdateRegistration(registration);
    setUpdateIncReq(inc_req);
    setUpdateCollaborator(collaborator);
  }, [registration, inc_req, collaborator]);

  return (
    <div className="flex w-full items-center gap-2">
      <div className="w-full">
        {pdfUrl && (
          <iframe
            loading="lazy"
            allowFullScreen
            allow="fullscreen"
            allowTransparency
            height={450}
            src={pdfUrl || ""}
            className="w-full border border-slate-300 rounded-lg"
            title={file_name}
          />
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-lg mb-4 font-semibold text-slate-700">
          Última alteração: {last_change}
        </h1>
        <InputComponent
          className="w-full p-2"
          value={updateRegistration}
          onChange={(e) => setUpdateRegistration(e.target.value)}
          label="Matrícula"
          classNameLabel="text-base"
        />
        <InputComponent
          value={updateCollaborator}
          onChange={(e) => setUpdateCollaborator(e.target.value)}
          className="w-full p-2"
          label="Colaborador(a)"
          classNameLabel="text-base"
        />
        <InputComponent
          value={updateIncReq}
          onChange={(e) => setUpdateIncReq(e.target.value)}
          className="w-full p-2"
          label="Incidente/Requisição"
          classNameLabel="text-base"
        />
        <ButtonComponent
          text="Alterar"
          type="submit"
          disabled={sameData}
          loading={loadingUpdateDataPdf}
          loaderIcon={<ClipLoader size={20} color="#fff" />}
          className="items-baseline text-base mt-16 font-bold transition duration-300 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          icon={<FaRegEdit size={20} />}
          onClick={() => {
            updateDataPdf(
              id,
              pdf_file,
              updateIncReq,
              updateCollaborator,
              updateRegistration,
              sameData
            );
            setOpenDialogViewPdf(false);
          }}
        />
      </div>
    </div>
  );
}
