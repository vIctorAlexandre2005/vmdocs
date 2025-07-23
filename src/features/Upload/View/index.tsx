import { Input } from "@/shared/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { SlCloudUpload } from "react-icons/sl";
import { useViewDoc } from "../viewModel/useViewDoc";
import { DialogComponent } from "@/shared/components/dialogs/dialog";
import { TbFileTextSpark } from "react-icons/tb";
import { InputComponent } from "@/shared/components/InputComponent";
import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { LuSend } from "react-icons/lu";

export function UploadView() {
  const {
    handleFile,
    fileName,
    progress,
    pdfUrl,
    dataPdf,
    openDialogViewPdf,
    setOpenDialogViewPdf,
    handleOpenFileDialog,
    inputRef,
    createDataPdf,
  } = useViewDoc();

  const [incReq, setIncReq] = useState<string>(dataPdf?.inc_req || "");
  const [collaborator, setCollaborator] = useState<string>(dataPdf?.collaborator || "");
  const [registration, setRegistration] = useState<string>(dataPdf?.registration || "");

  useEffect(() => {
    if (dataPdf) {
      setIncReq(dataPdf.inc_req || "");
      setCollaborator(dataPdf.collaborator || "");
      setRegistration(dataPdf.registration || "");
    }
  }, [dataPdf]);

  return (
    <div className="flex flex-col justify-center items-center mt-8 gap-4">
      <div
        onClick={handleOpenFileDialog}
        className="bg-transparent rounded-2xl transition duration-300 cursor-pointer w-full p-4 border-indigo-500 border border-dashed"
      >
        <div className="flex flex-col text-slate-800 justify-center items-center">
          <SlCloudUpload color="#6160ff" size={48} />
          <h1 className="text-xl font-semibold">Clique ou arraste o arquivo</h1>
          <p className="text-slate-700">* Apenas arquivos .PDF</p>
        </div>
        <Input
          onChange={handleFile}
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
        />
      </div>

      {fileName && (
        <div
          className="mt-4 w-full cursor-pointer border bg-white border-slate-200 shadow hover:bg-slate-100 rounded-3xl p-4 transition duration-300"
          onClick={() => setOpenDialogViewPdf(true)}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-100 rounded-full">
                <TbFileTextSpark size={24} color="#4636f5" />
              </div>
              <p className="flex gap-2 font-semibold text-slate-800 items-center">
                {fileName}
              </p>
            </div>
            <p className="text-slate-800">{progress}%</p>
          </div>
          <progress
            className="mt-2 w-full h-2 rounded overflow-hidden 
              [&::-webkit-progress-bar]:bg-gray-200 
              [&::-webkit-progress-value]:bg-indigo-500 
              [&::-moz-progress-bar]:bg-indigo-500"
            value={progress}
            max={100}
          />
        </div>
      )}

      <DialogComponent
        open={openDialogViewPdf}
        onOpenChange={setOpenDialogViewPdf as any}
        title={fileName || "Visualização do PDF"}
      >
        <div className="flex items-center justify-around gap-4">
          <div className="w-full">
            {pdfUrl && (
              <iframe
                loading="lazy"
                allowFullScreen
                allow="fullscreen"
                allowTransparency
                height={450}
                src={pdfUrl || ""}
                className="w-full border border-slate-300 rounded-lg"
                title="Visualização do PDF"
              />
            )}
          </div>

          <div className="flex w-full flex-col gap-2">
            <InputComponent
              className="w-full"
              value={collaborator}
              onChange={(e) => setCollaborator(e.target.value)}
              label="Nome do colaborador"
            />
            <InputComponent
              value={registration}
              onChange={(e) => setRegistration(e.target.value)}
              label="Matrícula"
            />
            <InputComponent
              value={incReq}
              onChange={(e) => setIncReq(e.target.value)}
              label="Incidente/Requisição"
            />
            <ButtonComponent
              text="Enviar"
              type="submit"
              className="items-baseline text-base font-bold transition duration-300 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              icon={<LuSend size={20} />}
              onClick={() => createDataPdf(fileName, incReq, collaborator, registration)}
            />
          </div>
        </div>
      </DialogComponent>
    </div>
  );
}
