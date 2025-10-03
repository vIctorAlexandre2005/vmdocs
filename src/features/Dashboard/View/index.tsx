import { MdOutlineCloudUpload } from "react-icons/md";
import { FiltersView } from "./FiltersView";
import { TableWithData } from "./Table/TableWithData";
import { usePdfData } from "@/features/Upload/viewModel/usePdfData";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { useTable } from "../viewModel/useTable";
import { TbListDetails, TbSearch } from "react-icons/tb";
import { PiExport } from "react-icons/pi";
import { InputComponent } from "@/shared/components/InputComponent";
import { Input } from "@/shared/components/ui/input";
import { useViewDoc } from "@/features/Upload/viewModel/useViewDoc";
import { OptionsTableTerms } from "@/features/Upload/View/optionsTerms";

export function ContainerTable() {
  const { dataPdf } = usePdfData();
  const {
    filteredData,
    exportDataExcel,
    valueFilter,
    setValueFilter,
    detailedView,
    toggleDetailedView,
  } = useTable();
  const { handleOpenFileDialog, handleFile, inputRef } = useViewDoc();
  return (
    <div className="w-11/12 max-h-1/2 h-96 overflow-auto border p-4 shadow-sm rounded-2xl bg-white">
      <div className="flex justify-between items-center mb-4 gap-4">
        <OptionsTableTerms />
      </div>
      <TableWithData />
    </div>
  );
}
