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
    <div className="w-11/12 border rounded-3xl shadow-sm flex flex-col gap-4 bg-white overflow-y-hidden">
      <div className="flex p-4 gap-4 items-center justify-between">
        <h1 className="text-xl flex items-center gap-2 font-bold text-indigo-600">
          Uploads <MdOutlineCloudUpload size={24} />{" "}
        </h1>
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
        </div>
        <ButtonComponent
          text="Importar Termo"
          iconRight={<MdOutlineCloudUpload size={20} />}
          onClick={handleOpenFileDialog}
          className="w-56 text-center text-sm text-gray-100 border rounded-full bg-indigo-600 transition duration-300"
        />
        <Input
          onChange={handleFile}
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
        />
        <ButtonComponent
          text="Exportar .CSV"
          onClick={() => exportDataExcel(filteredData)}
          className="w-56 text-center text-sm text-slate-800 border hover:text-gray-100 rounded-full hover:bg-indigo-600 transition duration-300"
          iconLeft={<PiExport size={20} />}
        />
      </div>
      <TableWithData />
    </div>
  );
}
