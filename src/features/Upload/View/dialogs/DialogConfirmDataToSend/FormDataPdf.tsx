import { useViewDoc } from "@/features/Upload/viewModel/useViewDoc";
import { InputComponent } from "@/shared/components/InputComponent";
import { DataExtractedPdfProps } from "@/shared/contexts/UploadPdfContext";
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
  collaborator,
  inc_req,
  patrimony,
  registration,
  pageNumber,
  setCollaborator,
  setIncReq,
  setPatrimony,
  setRegistration,
  item,
}: FormDataPdfProps) {
  const { expand, setExpand, expandPageData } = useViewDoc();

  useEffect(() => {
    if (pageNumber) {
      setCollaborator(item?.collaborator || "");
      setIncReq(item?.inc_req || "");
      setPatrimony(item?.patrimony || "");
      setRegistration(item?.registration || "");
    }
  }, []);

  return (
    <div key={pageNumber}>
      <p
        onClick={() => expandPageData(idx || 0)}
        className="text-indigo-500 font-bold cursor-pointer flex gap-2 items-center mb-2"
      >
        Página {pageNumber}
        {expand === idx ? (
          <IoIosArrowDown size={24} />
        ) : (
          <IoIosArrowBack size={24} />
        )}
      </p>

      {expand === idx && (
        <div>
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
            value={inc_req}
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
        </div>
      )}
    </div>
  );
}
