import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ClickAreaToChooseFile } from "./ClickAreaToChooseFile";
import { RecentUploads } from "./RecentUploads/RecentUploads";
import { DialogConfirmDataToSend } from "./dialogs/DialogConfirmDataToSend/DialogConfirmDataToSend";
import { GrDocumentText } from "react-icons/gr";
import { LuLaptopMinimalCheck } from "react-icons/lu";
import { TbDeviceLaptopOff, TbReplaceFilled } from "react-icons/tb";
import { TableWithData } from "@/features/Dashboard/View/Table/TableWithData";
import { ContainerTable } from "@/features/Dashboard/View";
import { usePdfData } from "../viewModel/usePdfData";
import { useMemo } from "react";

export function UploadView() {
  const { dataPdf } = usePdfData();
  const replacements = useMemo(() => {
    return dataPdf?.filter((item) => item.pages.map((item) => item.type_of_movement === "TROCA").length).length || 0;
  }, [dataPdf]);

  const terms = useMemo(() => {
    return dataPdf?.length || 0;
  }, [dataPdf]);

  const deliveries = useMemo(() => {
    return dataPdf?.filter((item) => item.pages.map((item) => item.type_of_movement === "ENTREGA").length).length || 0;
  }, [dataPdf]);

  const collections = useMemo(() => {
    return dataPdf?.filter((item) => item.pages.map((item) => item.type_of_movement === "RECOLHIMENTO").length).length || 0;
  }, [dataPdf]);

  const itemCards = [
  {
    icon: GrDocumentText,
    title: "Termos",
    value: terms,
  },
  {
    icon: LuLaptopMinimalCheck,
    title: "Entregas (admissões)",
    value: deliveries,
  },
  {
    icon: TbDeviceLaptopOff,
    title: "Recolhimentos",
    value: collections,
  },
  {
    icon: TbReplaceFilled,
    title: "Trocas",
    value: replacements,
  },
];
  return (
    <div className="flex flex-col justify-center items-center mt-8 gap-4 p-4">
      <div className="flex items-center gap-4 justify-around w-full">
        {itemCards.map((item, idx) => (
          <Card key={idx} className="w-full rounded-4xl">
            <CardContent className="flex flex-col gap-4">
               <div className="flex items-center gap-2">
                <span className="p-2 bg-indigo-100 rounded-full border border-indigo-400">
                  <item.icon color="#4636f5" size={24} />
                </span>
                <span className="text-lg font-semibold">{item.title}</span>
              </div>
              <span className="text-3xl opacity-85 font-bold">
                {item?.value}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* <ClickAreaToChooseFile /> */}
      {/* <RecentUploads /> */}
      <ContainerTable />
      <DialogConfirmDataToSend />
    </div>
  );
}
