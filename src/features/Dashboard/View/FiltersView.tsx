import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { InputComponent } from "@/shared/components/InputComponent";
import { IoFilter } from "react-icons/io5";
import { TbListDetails, TbSearch } from "react-icons/tb";
import { PiExport } from "react-icons/pi";
import { DataPdfProps } from "@/shared/contexts/UploadPdfContext";
import { useTable } from "../viewModel/useTable";
import { FaCheck } from "react-icons/fa";
import { useTableDashboardContext } from "@/shared/contexts/TableDashboard";

export function FiltersView({ dataPdf }: { dataPdf: DataPdfProps[] }) {
  const {
    exportDataExcel,
    setValueFilter,
    valueFilter,
    detailedView,
    toggleDetailedView,
  } = useTable();

  const { filteredData } = useTableDashboardContext();

  return (
    <div className="flex items-center gap-2">
      <InputComponent
        label=""
        value={valueFilter}
        onChange={(e) => setValueFilter(e.target.value)}
        placeholder="Pesquisar..."
        iconInside={<TbSearch size={20} />}
        className="pb-2 pt-2 pl-2 w-sm placeholder:text-gray-600 bg-transparent border-gray-300 hover:border-indigo-400 placeholder:text-sm text-sm text-gray-800 focus:ring-1 focus:ring-indigo-500 rounded-full"
      />
      <ButtonComponent
        text="Visualização detalhada"
        className={`
          w-80 text-sm rounded-full transition duration-300 
          ${
            detailedView
              ? "bg-indigo-600 text-gray-100"
              : "bg-transparent text-gray-600 border"
          }
        `}
        iconLeft={<TbListDetails size={20} />}
        onClick={toggleDetailedView}
      />
      <ButtonComponent
        text="Exportar .CSV"
        onClick={() => exportDataExcel(filteredData)}
        className="w-56 text-center text-sm text-gray-100 rounded-full bg-indigo-600"
        iconLeft={<PiExport size={20} />}
      />
    </div>
  );
}
