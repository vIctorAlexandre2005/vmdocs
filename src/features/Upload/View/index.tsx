import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ClickAreaToChooseFile } from "./ClickAreaToChooseFile";
import { RecentUploads } from "./RecentUploads/RecentUploads";
import { DialogConfirmDataToSend } from "./dialogs/DialogConfirmDataToSend/DialogConfirmDataToSend";
import { GrDocumentText } from "react-icons/gr";
import { LuLaptopMinimalCheck } from "react-icons/lu";
import { TbDeviceLaptopOff, TbReplaceFilled } from "react-icons/tb";
import { TableWithData } from "@/features/Dashboard/View/Table/TableWithData";
import { DashboardView } from "@/features/Dashboard/View";

const itemCards = [
  {
    icon: GrDocumentText,
    title: "Termos",
    value: 10,
  },
  {
    icon: LuLaptopMinimalCheck,
    title: "Entregas (admissões)",
    value: 10,
  },
  {
    icon: TbDeviceLaptopOff,
    title: "Recolhimentos",
    value: 10,
  },
  {
    icon: TbReplaceFilled,
    title: "Trocas",
    value: 10,
  },
];

export function UploadView() {
  return (
    <div className="flex flex-col justify-center items-center mt-8 gap-4 p-4">
      <div className="flex items-center gap-4 justify-around w-full">
        {itemCards.map((item, idx) => (
          <Card key={idx} className="w-full rounded-4xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="p-2 bg-indigo-100 rounded-full border border-indigo-400">
                  <item.icon color="#4636f5" size={24} />
                </span>
                <span className="text-lg font-semibold">{item.title}</span>
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-3xl opacity-85 font-bold">
                {item.value}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
      <ClickAreaToChooseFile />
      {/* <RecentUploads /> */}
      <DashboardView />
      <DialogConfirmDataToSend />
    </div>
  );
}
