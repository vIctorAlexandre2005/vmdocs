import { TbFileTextSpark } from "react-icons/tb";
import { useViewDoc } from "../../viewModel/useViewDoc";
import { RecentUploadCard } from "./RecentUploadCard";
import { usePdfData } from "../../viewModel/usePdfData";
import { ClipLoader } from "react-spinners";

export function RecentUploads() {
  const { setOpenDialogViewPdf, loadingReaderPdf } = useViewDoc();
  const { dataPdf, progress, loadingGetDataPdf } = usePdfData();
  return (
    <div className="w-full">
      <h1 className="text-lg font-semibold text-slate-800 text-left">
        Uploads recentes
      </h1>
      {loadingGetDataPdf ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#4636f5" size={32} />
        </div>
      ) : (
        // lista os últimos 5 uploads
        <>
          {dataPdf?.length === 0 && (
            <div className="flex justify-center items-center">
              <img src={"/undraw_empty.svg"} height={150} width={150} />
              <p className="text-slate-800">Nenhum upload encontrado</p>
            </div>
          )}
          {dataPdf?.slice(0, 5)?.map((item, index) => (
            <RecentUploadCard
              key={index}
              fileName={item?.file_name}
              created_at={item?.created_at}
              last_change={item?.updated_at}
              progress={progress}
              setOpenDialogViewPdf={setOpenDialogViewPdf}
            />
          ))}
        </>
      )}
    </div>
  );
}
