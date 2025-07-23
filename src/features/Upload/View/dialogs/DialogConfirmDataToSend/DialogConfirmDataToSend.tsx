import { DialogComponent } from "@/shared/components/dialogs/dialog";
import { usePdfData } from "../../../viewModel/usePdfData";
import { useEffect, useState } from "react";
import { useViewDoc } from "../../../viewModel/useViewDoc";
import { ViewPdfInDialog } from "./ViewPdfInDialog";
import { FormDataPdf } from "./FormDataPdf";

export function DialogConfirmDataToSend() {
  const {
    dataExtractedPdf,
    pdfUrl,
    fileName,
    openDialogViewPdf,
    setOpenDialogViewPdf,
  } = useViewDoc();
  const { createDataPdf } = usePdfData();

  const [incReq, setIncReq] = useState<string>(dataExtractedPdf?.inc_req || "");
  const [collaborator, setCollaborator] = useState<string>(
    dataExtractedPdf?.collaborator || ""
  );
  const [registration, setRegistration] = useState<string>(
    dataExtractedPdf?.registration || ""
  );

  useEffect(() => {
    if (dataExtractedPdf) {
      setIncReq(dataExtractedPdf.inc_req || "");
      setCollaborator(dataExtractedPdf.collaborator || "");
      setRegistration(dataExtractedPdf.registration || "");
    }
  }, [dataExtractedPdf]);
  
  return (
    <DialogComponent
      open={openDialogViewPdf}
      onOpenChange={setOpenDialogViewPdf as any}
      title={fileName || "Visualização do PDF"}
    >
      <div className="flex items-center justify-around gap-4">
        <ViewPdfInDialog pdfUrl={pdfUrl} />
        <FormDataPdf
          collaborator={collaborator}
          registration={registration}
          incReq={incReq}
          fileName={fileName || ""}
          createDataPdf={createDataPdf}
          setCollaborator={setCollaborator}
          setRegistration={setRegistration}
          setIncReq={setIncReq}
        />
      </div>
    </DialogComponent>
  );
}
