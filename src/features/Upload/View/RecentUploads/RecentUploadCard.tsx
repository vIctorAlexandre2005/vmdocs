import { TbFileTextSpark } from "react-icons/tb";

interface RecentUploadCardProps {
  fileName: string;
  progress: number;
  setOpenDialogViewPdf: (open: boolean) => void;
  created_at: string;
  last_change: string;
}
export function RecentUploadCard({
  fileName,
  progress,
  setOpenDialogViewPdf,
  created_at,
  last_change,
}: RecentUploadCardProps) {
  return (
    <div
      className="mt-4 w-full gap-2 flex flex-col cursor-pointer border bg-white border-slate-200 shadow hover:bg-slate-100 rounded-3xl p-4 transition duration-300"
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
      <p className="text-sm font-semibold text-slate-600">Criado em {created_at}</p>
    </div>
  );
}
