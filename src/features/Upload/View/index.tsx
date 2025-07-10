import { Input } from "@/shared/components/ui/input";
import { useRef } from "react";
import { SlCloudUpload } from "react-icons/sl";
import { useViewDoc } from "../viewModel/useViewDoc";
import { Progress } from "@/shared/components/ui/progress";

export function UploadView() {
  const { handleFile, fileName, progress, pdfUrl } = useViewDoc();
  const inputRef = useRef<HTMLInputElement>(null);

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
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <p className="text-slate-900">{fileName}</p>
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

      {pdfUrl && (
        <iframe
          src={pdfUrl}
          className="mt-6 w-full h-[600px] border"
          title="Visualização do PDF"
        />
      )}
    </div>
  );
}
