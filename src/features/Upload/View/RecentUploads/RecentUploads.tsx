import { TbFileTextSpark } from "react-icons/tb";
import { useViewDoc } from "../../viewModel/useViewDoc";
import { RecentUploadCard } from "./RecentUploadCard";
import { usePdfData } from "../../viewModel/usePdfData";

export function RecentUploads() {
  const { setOpenDialogViewPdf } = useViewDoc();
  const { dataPdf, progress } = usePdfData();
  return (
    <div className="w-full">
      <h1 className="text-lg font-semibold text-slate-800 text-left">
        Uploads recentes
      </h1>
      {dataPdf.map((item, index) => (
        <RecentUploadCard
          key={index}
          fileName={item.file_name}
          created_at={item.created_at}
          last_change={item.last_change}
          progress={progress}
          setOpenDialogViewPdf={setOpenDialogViewPdf}
        />
      ))}
    </div>
  );
}
