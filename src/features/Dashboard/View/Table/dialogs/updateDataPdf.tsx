import { useTable } from "@/features/Dashboard/viewModel/useTable";
import { usePdfData } from "@/features/Upload/viewModel/usePdfData";
import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { InputComponent } from "@/shared/components/InputComponent";
import { Dispatch, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import {
  DataExtractedPdfProps,
  useUploadPdfContext,
} from "@/shared/contexts/UploadPdfContext";
import { ViewPdfInDialog } from "@/features/Upload/View/dialogs/DialogConfirmDataToSend/ViewPdfInDialog";

interface UpdateDataPdfProps {
  id: number;
  registration: string;
  collaborator: string;
  inc_req: string;
  pdf_file: string;
  file_name: string;
  last_change: string;
  setOpenDialogViewPdf: Dispatch<React.SetStateAction<boolean>>;
  pageNumber: number;
  patrimony: string;
  item: DataExtractedPdfProps;
  pages: DataExtractedPdfProps[];
}

export function UpdateDataPdf({
  id,
  collaborator,
  inc_req,
  registration,
  pdf_file,
  file_name,
  last_change,
  patrimony,
  setOpenDialogViewPdf,
  pages,
  pageNumber,
  item,
}: UpdateDataPdfProps) {
  const { updateField, pdfUrl } = useUploadPdfContext();
  const [updateRegistration, setUpdateRegistration] = useState<string>("");
  const [updateIncReq, setUpdateIncReq] = useState<string>("");
  const [updateCollaborator, setUpdateCollaborator] = useState<string>("");
  const [updatePatrimony, setUpdatePatrimony] = useState<string>("");

  const { convertBase64ToPdf } = useTable();
  const { updateDataPdf, loadingUpdateDataPdf } = usePdfData();

  console.log("pdfUrl: ", pdf_file);

  const sameData =
    updateRegistration === registration &&
    updateIncReq === inc_req &&
    updateCollaborator === collaborator;

  useEffect(() => {
    setUpdateRegistration(item.registration);
    setUpdateIncReq(item.inc_req);
    setUpdateCollaborator(item.collaborator);
    setUpdatePatrimony(item.patrimony);
  }, [registration, inc_req, collaborator]);

  return (
    <div className="w-full flex-col flex">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue={item.pageNumber === 1 ? "item-1" : ""}
      >
        <AccordionItem
          value={"item-1"}
          className="border-t p-2 border-indigo-200"
        >
          <AccordionTrigger className="font-bold text-indigo-500 text-lg cursor-pointer">
            Página {item.pageNumber}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <InputComponent
              className="w-full p-2"
              value={updateCollaborator}
              onChange={(e) =>
                updateField(item.pageNumber, "collaborator", e.target.value)
              }
              label="Nome do colaborador"
            />
            <InputComponent
              className="w-full p-2"
              value={updateRegistration}
              onChange={(e) =>
                updateField(item.pageNumber, "registration", e.target.value)
              }
              label="Matrícula"
            />
            <InputComponent
              className="w-full p-2"
              value={updateIncReq}
              onChange={(e) =>
                updateField(item.pageNumber, "inc_req", e.target.value)
              }
              label="Incidente/Requisição"
            />

            <InputComponent
              value={updatePatrimony}
              onChange={(e) =>
                updateField(item.pageNumber, "patrimony", e.target.value)
              }
              className="w-full p-2"
              label="Patrimônio"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
