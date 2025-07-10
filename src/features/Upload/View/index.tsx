import { Input } from "@/shared/components/ui/input";
import { useRef } from "react";
import { SlCloudUpload } from "react-icons/sl";
import { useViewDoc } from "../viewModel/useViewDoc";
import { Progress } from "@/shared/components/ui/progress";

export function UploadView() {
  const { handleFile, fileName, progress } = useViewDoc();
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
          className="hidden"
        />
      </div>

      {fileName && (
        <div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-slate-900">{fileName}</p>
          <p className="text-slate-900">{progress}%</p>
          </div>
          <progress 
            className="mt-2 w-full bg-violet-400 wew-full h-2 rounded overflow-hidden [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:bg-violet-500 [&::-moz-progress-bar]:bg-green-500" 
            value={progress} 
            max={100}
          />
        </div>
      )}
    </div>
  );
}
