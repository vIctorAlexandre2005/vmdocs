import { useViewDoc } from "@/features/Upload/viewModel/useViewDoc";
import { InputComponent } from "@/shared/components/InputComponent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  DataExtractedPdfProps,
  useUploadPdfContext,
} from "@/shared/contexts/UploadPdfContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { FieldsPreview } from "./FieldsPreview";

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
          <AccordionContent className="grid grid-cols-2 gap-4 text-balance">
            <FieldsPreview data={data} updateField={updateField} idx={idx} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
