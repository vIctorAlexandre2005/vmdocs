import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardComponent } from "@/shared/components/CardComponent";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { FaLaptop, FaLaptopHouse } from "react-icons/fa";
import { GrDocumentText } from "react-icons/gr";
import { LuLaptopMinimalCheck } from "react-icons/lu";
import {
  TbDeviceLaptopOff,
  TbReplaceFilled,
  TbSettingsUp,
} from "react-icons/tb";
import { BarComponent } from "./Bar";
import { TableWithData } from "@/features/Dashboard/View/Table/TableWithData";
import { ContainerTable } from "@/features/Dashboard/View";

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
  return (
    <div className="flex flex-col p-4 gap-4">
      <h1 className="text-2xl font-semibold">Notebooks</h1>
      <div className="cards flex justify-around gap-4 items-center">
        {itemCards.map((item) => (
          <CardComponent
            icon={<item.icon size={24} />}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>

      <div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Visão Geral de todas as Sedes</CardTitle>
            <CardDescription>
              CHESF - ELETROBRAS - ELETRONORTE - ELETROSUL
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BarComponent />
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="w-full flex justify-center items-center">
        {/* CRIAR UMA NOVA TABELA ESTILIZADA */}
      </div>
    </div>
  );
}
