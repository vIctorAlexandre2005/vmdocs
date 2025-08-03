import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { InputComponent } from "@/shared/components/InputComponent";
import { IoFilter } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";
import { PiExport } from "react-icons/pi";
import { DataPdfProps } from "@/shared/contexts/UploadPdfContext";
import { useTable } from "../viewModel/useTable";

export function FiltersView({ dataPdf }: { dataPdf: DataPdfProps[] }) {
  const { exportDataExcel } = useTable();

  return (
    <div className="flex items-center gap-2">
      {/* <InputComponent
        label=""
        placeholder="Pesquisar..."
        iconInside={<TbSearch size={20} />}
        className="pb-2 pt-2 pl-2 w-sm placeholder:text-gray-600 bg-transparent border-gray-300 hover:border-indigo-400 placeholder:text-sm text-sm text-gray-800 focus:ring-1 focus:ring-indigo-500 rounded-full"
      /> */}
      {/* <ButtonComponent
        text="Filtrar"
        className="w-32 text-sm text-gray-100 rounded-full bg-indigo-600"
        iconLeft={<IoFilter size={20} />}
      /> */}
      <ButtonComponent
        text="Exportar .CSV"
        onClick={() => exportDataExcel(dataPdf)}
        className=" w-52 text-center text-sm text-gray-100 rounded-full bg-indigo-600"
        iconLeft={<PiExport size={20} />}
      />
    </div>
  );
}
