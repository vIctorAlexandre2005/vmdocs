import { useViewDoc } from "@/features/Upload/viewModel/useViewDoc";
import { InputComponent } from "@/shared/components/InputComponent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { DataExtractedPdfProps, useUploadPdfContext } from "@/shared/contexts/UploadPdfContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";

interface FormDataPdfProps {
  item: DataExtractedPdfProps;
  collaborator: string;
  registration: string;
  inc_req: string;
  patrimony: string;
  idx: number;
  pageNumber: number;
  setCollaborator: Dispatch<SetStateAction<string>>;
  setRegistration: Dispatch<SetStateAction<string>>;
  setIncReq: Dispatch<SetStateAction<string>>;
  setPatrimony: Dispatch<SetStateAction<string>>;
}

export function FormDataPdf({
  idx,
  /* collaborator,
  inc_req,
  patrimony,
  registration,
  setCollaborator,
  setIncReq,
  setPatrimony,
  setRegistration, */
  pageNumber,
  item,
}: FormDataPdfProps) {
  const { expand, setExpand, expandPageData } = useViewDoc();

  const {
      collaborator,
      incReq,
      patrimony,
      registration,
      setCollaborator,
      setIncReq,
      setPatrimony,
      setRegistration,
      dataExtractedPdf
    } = useUploadPdfContext();

  useEffect(() => {
      setCollaborator(item?.collaborator || "");
      setIncReq(item?.inc_req || "");
      setPatrimony(item?.patrimony || "");
      setRegistration(item?.registration || "");
    
  }, []);

  return (
    <div>
      <Accordion
        type="single"
        className="w-full"
        defaultValue={`item-${idx}`}
      >
        <AccordionItem value={`item-${idx}`}>
          <AccordionTrigger className="font-bold text-indigo-500 cursor-pointer">Página {pageNumber}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
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

            <InputComponent
              value={patrimony}
              className="w-full p-2"
              onChange={(e) => setPatrimony(e.target.value)}
              label="Patrimônio"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
