import { DialogComponent } from "@/shared/components/dialogs/dialog";
import { usePdfData } from "../../../viewModel/usePdfData";
import { useEffect, useState } from "react";
import { useViewDoc } from "../../../viewModel/useViewDoc";
import { ViewPdfInDialog } from "./ViewPdfInDialog";
import { FormDataPdf } from "./FormDataPdf";
import { Loader } from "@/shared/components/Loader";
import { useUploadPdfContext } from "@/shared/contexts/UploadPdfContext";
import { MdCancel, MdOutlineCancel } from "react-icons/md";
import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { PuffLoader } from "react-spinners";

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
    updateField,
    errorExtractDataPdf
  } = useViewDoc();
  //const { pdfUrl } = useUploadPdfContext();
  const { createDataPdf, loadingCreatePdf } = usePdfData();

  return (
    <DialogComponent
      open={openDialogViewPdf}
      onOpenChange={setOpenDialogViewPdf as any}
      title={"Confira os dados extraídos"}
      onClick={() => createDataPdf(fileName || "", formDataByPage)}
      textButtonCancel="Fechar"
      textButtonConfirm="Enviar"
      loadingShowButton={loadingReaderPdf || errorExtractDataPdf}
      loadingFallbackButton={loadingCreatePdf}
    >
      {errorExtractDataPdf && (
          <div className="flex w-full flex-col justify-center items-center">
            <MdCancel  color="#f80a0a" size={64} />
            <h1 className="text-center font-semibold text-xl">Oops! Não foi possível processar o arquivo enviado</h1>
          </div>
        )}
      <div className="flex items-center justify-around gap-4">
        {loadingReaderPdf ? (
          <div className="flex justify-center items-center">
            <Loader loaderIcon={<PuffLoader size={50} color="#3b82f6" />} />
          </div>
        ) : (
          <>
            <ViewPdfInDialog pdfUrl={pdfUrl} file_name={fileName} />
            <div className="flex w-full flex-col overflow-auto max-h-[80vh] gap-2">
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
