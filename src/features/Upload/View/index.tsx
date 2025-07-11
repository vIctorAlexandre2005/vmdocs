import { Input } from "@/shared/components/ui/input";
import { useRef, useState } from "react";
import { SlCloudUpload } from "react-icons/sl";
import { useViewDoc } from "../viewModel/useViewDoc";
import { Progress } from "@/shared/components/ui/progress";
import { DialogComponent } from "@/shared/components/dialogs/dialog";
import { TbFileTextSpark } from "react-icons/tb";

export function UploadView() {
  const { handleFile, fileName, progress, pdfUrl, setPdfUrl } = useViewDoc();
  const inputRef = useRef<HTMLInputElement>(null);

  const [openDialogViewPdf, setOpenDialogViewPdf] = useState(false);

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        className="bg-violet-50 rounded-2xl transition duration-300 hover:bg-violet-100 cursor-pointer w-2xl p-12 border border-violet-400 border-dashed"
      >
        <div className="flex flex-col text-black justify-center items-center">
          <SlCloudUpload color="#6B46C1" size={60} />
          <h1 className="text-2xl font-semibold">
            Clique ou arraste o arquivo
          </h1>
          <p className="text-slate-900">* Apenas arquivos .PDF</p>
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
          className="mt-4 cursor-pointer border hover:bg-slate-100 rounded-lg p-4 transition duration-300"
          onClick={() => setOpenDialogViewPdf(true)}
        >
          <div className="flex justify-between items-center">
            <p className="text-slate-900 flex gap-2 items-center"><TbFileTextSpark size={24} /> {fileName}</p>
            <p className="text-slate-900">{progress}%</p>
          </div>
          <progress
            className="mt-2 w-full h-2 rounded overflow-hidden 
              [&::-webkit-progress-bar]:bg-gray-200 
              [&::-webkit-progress-value]:bg-violet-500 
              [&::-moz-progress-bar]:bg-violet-500"
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
        {pdfUrl && (
          <iframe
            loading="lazy"
            allowFullScreen
            allow="fullscreen"
            height={600}
            src={pdfUrl || ""}
            className="w-full border border-slate-300 rounded-lg"
            title="Visualização do PDF"
          />
        )}
      </DialogComponent>
    </div>
  );
}
