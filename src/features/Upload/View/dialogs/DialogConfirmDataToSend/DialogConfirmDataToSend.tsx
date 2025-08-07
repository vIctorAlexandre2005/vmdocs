import { DialogComponent } from "@/shared/components/dialogs/dialog";
import { usePdfData } from "../../../viewModel/usePdfData";
import { useEffect, useState } from "react";
import { useViewDoc } from "../../../viewModel/useViewDoc";
import { ViewPdfInDialog } from "./ViewPdfInDialog";
import { FormDataPdf } from "./FormDataPdf";
import { Loader } from "@/shared/components/Loader";
import { useUploadPdfContext } from "@/shared/contexts/UploadPdfContext";

export function DialogConfirmDataToSend() {
  const {
    dataExtractedPdf,
    pdfUrl,
    fileName,
    openDialogViewPdf,
    setOpenDialogViewPdf,
    loadingReaderPdf,
    expand,
    setExpand,
    expandPageData,
    formDataByPage,
    updateField
  } = useViewDoc();
  const { createDataPdf, loadingCreatePdf } = usePdfData();

    console.log("Enviando para o usePdfData: ", formDataByPage);

  return (
    <DialogComponent
      open={openDialogViewPdf}
      onOpenChange={setOpenDialogViewPdf as any}
      title={fileName || "Visualização do PDF"}
      onClick={() =>
        createDataPdf(
          fileName || "",
          formDataByPage
        )
      }
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
            <div className="flex w-full flex-col overflow-auto max-h-[400px] gap-2">
              {dataExtractedPdf?.map((item, idx) => (
                <FormDataPdf
                  idx={idx}
                  item={item}
                  key={idx}
                  data={formDataByPage[idx]}
                  updateField={updateField}
                  pageNumber={item?.pageNumber}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </DialogComponent>
  );
}
