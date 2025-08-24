import { useTable } from "@/features/Dashboard/viewModel/useTable";
import { usePdfData } from "@/features/Upload/viewModel/usePdfData";
import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { InputComponent } from "@/shared/components/InputComponent";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  file_name: string;
  last_change: string;
  setOpenDialogViewPdf: Dispatch<React.SetStateAction<boolean>>;
  item: DataExtractedPdfProps;
  pages: DataExtractedPdfProps[];
}

export function UpdateDataPdf({ item, id }: UpdateDataPdfProps) {
  const { updateField, formDataByPage } = useUploadPdfContext();

  return (
    <div className="w-full flex-col flex">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue={item?.pageNumber === 1 ? "item-1" : ""}
      >
        <AccordionItem
          value="item-1"
          className="border-t p-2 border-indigo-200"
        >
          <AccordionTrigger className="font-bold text-indigo-500 text-lg cursor-pointer">
            Página {item?.pageNumber}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <InputComponent
              className="w-full p-2"
              value={item?.collaborator}
              onChange={(e) => updateField(id, "collaborator", e.target.value)}
              label="Nome do colaborador"
            />
            <InputComponent
              className="w-full p-2"
              value={item?.registration}
              onChange={(e) => updateField(id, "registration", e.target.value)}
              label="Matrícula"
            />
            <InputComponent
              className="w-full p-2"
              value={item?.inc_req}
              onChange={(e) => updateField(id, "inc_req", e.target.value)}
              label="Incidente/Requisição"
            />
            <InputComponent
              className="w-full p-2"
              value={item?.patrimony}
              onChange={(e) => updateField(id, "patrimony", e.target.value)}
              label="Patrimônio"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
