import { Input } from "@/shared/components/ui/input";
import { useRef } from "react";
import { SlCloudUpload } from "react-icons/sl";

export function UploadView() {
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
        <Input ref={inputRef} type="file" className="hidden" />
      </div>
    </div>
  );
}
