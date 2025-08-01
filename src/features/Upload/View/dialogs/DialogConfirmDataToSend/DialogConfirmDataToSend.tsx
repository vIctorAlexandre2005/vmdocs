import { DialogComponent } from "@/shared/components/dialogs/dialog";
import { usePdfData } from "../../../viewModel/usePdfData";
import { useEffect, useState } from "react";
import { useViewDoc } from "../../../viewModel/useViewDoc";
import { ViewPdfInDialog } from "./ViewPdfInDialog";
import { FormDataPdf } from "./FormDataPdf";
import { Loader } from "@/shared/components/Loader";

export function DialogConfirmDataToSend() {
  const {
    dataExtractedPdf,
    pdfUrl,
    fileName,
    openDialogViewPdf,
    setOpenDialogViewPdf,
    loadingReaderPdf,
  } = useViewDoc();
  const { createDataPdf, loadingCreatePdf } = usePdfData();

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
      onClick={() => createDataPdf(fileName || "", incReq, collaborator, registration)}
      textButtonCancel="Fechar"
      textButtonConfirm="Enviar"
      loadingShowButton={loadingReaderPdf}
      loadingFallbackButton={loadingCreatePdf}
    >
      <div className="flex items-center justify-around gap-4">
        {loadingReaderPdf ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            <ViewPdfInDialog pdfUrl={pdfUrl} />
            <FormDataPdf
              loadingCreatePdf={loadingCreatePdf}
              collaborator={collaborator}
              registration={registration}
              incReq={incReq}
              fileName={fileName || ""}
              createDataPdf={createDataPdf}
              setCollaborator={setCollaborator}
              setRegistration={setRegistration}
              setIncReq={setIncReq}
              setOpenDialogViewPdf={setOpenDialogViewPdf}
            />
          </>
        )}
      </div>
    </DialogComponent>
  );
}
