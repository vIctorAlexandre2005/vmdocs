import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { InputComponent } from "@/shared/components/InputComponent";
import { IoFilter } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";
import { PiExport } from "react-icons/pi";
import { DataPdfProps } from "@/shared/contexts/UploadPdfContext";
import { useCSVDownloader } from "react-papaparse";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function FiltersView({ dataPdf }: { dataPdf: DataPdfProps[] }) {
  //const { CSVDownloader, Type } = useCSVDownloader();

  function exportDataExcel(data: DataPdfProps[]) {
    const exportData = data.map(({ file_name, collaborator, inc_req }) => ({
    "Nome do termo": file_name,
    Colaborador: collaborator,
    "Incidente/Requisição": inc_req,
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);

  // Ajustar largura das colunas com base no conteúdo
  const columnWidths = Object.keys(exportData[0]).map((key) => {
    const maxLength = Math.max(
      key.length,
      ...exportData.map((row: any) => String(row[key]).length)
    );
    return { wch: maxLength + 2 };
  });
  worksheet["!cols"] = columnWidths;

   const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Termos");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(blob, "termos.xlsx");
  }

  return (
    <div className="flex items-center gap-2">
      <InputComponent
        label=""
        placeholder="Pesquisar..."
        iconInside={<TbSearch size={20} />}
        className="pb-2 pt-2 pl-2 w-sm placeholder:text-gray-600 bg-transparent border-gray-300 hover:border-indigo-400 placeholder:text-sm text-sm text-gray-800 focus:ring-1 focus:ring-indigo-500 rounded-full"
      />
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
