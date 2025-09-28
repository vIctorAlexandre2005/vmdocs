import { Input } from "@/shared/components/ui/input";
import { SlCloudUpload } from "react-icons/sl";
import { useViewDoc } from "../viewModel/useViewDoc";

export function ClickAreaToChooseFile() {
  const { handleOpenFileDialog, handleFile, inputRef } = useViewDoc();
  return (
    <div
      onClick={handleOpenFileDialog}
      onDragOver={handleFile as any}
      onDrop={(handleFile as any)}
      onDropCapture={(handleFile as any)}
      className="bg-white rounded-2xl transition duration-300 cursor-pointer w-1/2 p-4 border-indigo-500 border hover:drop-shadow-2xl"
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
  );
}
