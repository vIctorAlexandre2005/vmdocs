import { useViewDoc } from "@/features/Upload/viewModel/useViewDoc";
import { InputComponent } from "@/shared/components/InputComponent";
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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";

interface FormDataPdfProps {
  item: DataExtractedPdfProps;
  idx: number;
  pageNumber: number;
  data: DataExtractedPdfProps;
  updateField: (
    idx: number,
    field: keyof DataExtractedPdfProps,
    value: string
  ) => void;
}

export function FormDataPdf({
  idx,
  pageNumber,
  data,
  updateField,
}: FormDataPdfProps) {
  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue={pageNumber === 1 ? "item-1" : ""}
      >
        <AccordionItem
          value={"item-1"}
          className="border-t p-2 border-indigo-200"
        >
          <AccordionTrigger className="font-bold text-indigo-500 text-lg cursor-pointer">
            Página {pageNumber}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <InputComponent
              className="w-full p-2"
              value={data?.collaborator}
              onChange={(e) => updateField(idx, "collaborator", e.target.value)}
              label="Nome do colaborador"
            />
            <InputComponent
              className="w-full p-2"
              value={data?.registration}
              onChange={(e) => updateField(idx, "registration", e.target.value)}
              label="Matrícula"
            />
            <InputComponent
              className="w-full p-2"
              value={data?.inc_req}
              onChange={(e) => updateField(idx, "inc_req", e.target.value)}
              label="Incidente/Requisição"
            />

            <InputComponent
              value={data?.patrimony}
              onChange={(e) => updateField(idx, "patrimony", e.target.value)}
              className="w-full p-2"
              label="Patrimônio"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
