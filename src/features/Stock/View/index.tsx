import { CardComponent } from "@/shared/components/CardComponent";
import { FaLaptop, FaLaptopHouse } from "react-icons/fa";
import { LuLaptopMinimalCheck } from "react-icons/lu";
import { TbSettingsUp } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { DonutComponent } from "./donut";
import { BarComponent } from "./BarComponent";
import { OptionsTable } from "./optionsTable";
import { useImportExcel } from "../viewModel/useImportExcel";
import { TableExcelData } from "./TableExcelData";
import Image from "next/image";
import { Loader } from "@/shared/components/Loader";
import { SyncLoader } from "react-spinners";

const itemCards = [
  {
    icon: LuLaptopMinimalCheck,
    title: "Disponíveis",
    value: 40,
  },
  {
    icon: FaLaptopHouse,
    title: "Em uso",
    value: 20,
  },
  {
    icon: TbSettingsUp,
    title: "Manutenção",
    value: 30,
  },
  {
    icon: FaLaptop,
    title: "A preparar",
    value: 10,
  },
];

export function StockComponent() {
  const [search, setSearch] = useState("");
  const { excelData, total_pages, page, setPage, loadingTableExcel } =
    useImportExcel();

  return (
    <div className="flex flex-col p-4 w-11/12 gap-4">
      <h1 className="text-2xl text-slate-700 font-semibold">Controle de máquinas</h1>
      <div className="cards flex justify-between w-full gap-4 items-center">
        {itemCards.map((item) => (
          <CardComponent
            key={item.title}
            icon={<item.icon size={24} />}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>

      <div className="w-full flex items-start justify-around gap-4">
        <DonutComponent />
        <BarComponent />
      </div>

      <div className={`p-4 shadow-sm w-full ${loadingTableExcel && "h-96"} max-w-full border rounded-2xl bg-white`}>
        <div className="flex justify-between items-center mb-4 gap-4">
          <OptionsTable
            page={page}
            setPage={setPage}
            totalPages={total_pages}
            search={search}
            setSearch={setSearch}
          />
        </div>
        {!excelData?.length && !loadingTableExcel && (
          <div className="flex flex-col justify-center gap-10 items-center">
            <Image
              src="/fallback_table_empty.svg"
              alt="fallback_table_empty"
              height={400}
              width={400}
            />
            <p className="text-slate-800 text-xl font-semibold">Nada foi importado ainda!</p>
          </div>
        )}
        {loadingTableExcel && (
          <div className="flex flex-col justify-center gap-10 items-center">
            <SyncLoader color="#4636f5" />
            <p className="text-slate-800 text-xl font-semibold">Carregando...</p>
          </div>
        )}
        {!loadingTableExcel && excelData?.length > 0 && (
          <TableExcelData excelData={excelData} />
        )}
      </div>
    </div>
  );
}
