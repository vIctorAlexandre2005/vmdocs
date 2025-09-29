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
      
    </div>
  );
}
