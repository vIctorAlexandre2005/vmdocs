import { useTable } from "@/features/Dashboard/viewModel/useTable";
import { usePdfData } from "@/features/Upload/viewModel/usePdfData";
import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { InputComponent } from "@/shared/components/InputComponent";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";


interface UpdateDataPdfProps {
  id: number;
  registration: string;
  collaborator: string;
  inc_req: string;
  pdf_file: string;
  file_name: string;
  last_change: string;
}

export function UpdateDataPdf({
  id,
  collaborator,
  inc_req,
  registration,
  pdf_file,
  file_name,
  last_change,
}: UpdateDataPdfProps) {
  const [updateRegistration, setUpdateRegistration] = useState<string>("");
  const [updateIncReq, setUpdateIncReq] = useState<string>("");
  const [updateCollaborator, setUpdateCollaborator] = useState<string>("");

  const { convertBase64ToPdf, pdfUrl } = useTable();
  const { updateDataPdf } = usePdfData();

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
            title="Visualização do PDF"
          />
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
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
          className="items-baseline text-base mt-16 font-bold transition duration-300 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          icon={<FaRegEdit size={20} />}
          onClick={() => updateDataPdf(id, pdf_file, updateIncReq, updateCollaborator, updateRegistration)}
        />
      </div>
    </div>
  );
}
