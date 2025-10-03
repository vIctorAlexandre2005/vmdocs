import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { useMemo } from "react";

export const description = "A donut chart with text";
const chartData = [
  { status: "avaliable", laptops: 200, fill: "var(--color-avaliable)" },
  { status: "in_use", laptops: 100, fill: "var(--color-in_use)" },
  { status: "maintenance", laptops: 187, fill: "var(--color-maintenance)" },
  { status: "to_prepare", laptops: 187, fill: "var(--color-to_prepare)" },
];
const chartConfig = {
  laptops: {
    label: "Total de Notebooks",
  },
  avaliable: {
    label: "Disponíveis",
    color: "#0400fa",
  },
  in_use: {
    label: "Em uso",
    color: "#ff6932",
  },
  maintenance: {
    label: "Manutenção",
    color: "#ff0000",
  },
  to_prepare: {
    label: "A preparar",
    color: "#5673ff",
  },
} satisfies ChartConfig;

export function DonutComponent() {
  const totallaptops = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.laptops, 0);
  }, []);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total de Notebooks</CardTitle>
        <CardDescription>
          CHESF - ELETROBRAS - ELETRONORTE - ELETROSUL
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="laptops"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          fill="var(--color-available)"
                          className="fill-slate-700 text-3xl font-bold"
                        >
                          {totallaptops.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-slate-600"
                        >
                          Total Notebooks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          * O valor total contabiliza os notebooks em uso e em manutenção.
        </div>
        <div className="text-muted-foreground leading-none">
          Mostrando total de notebooks dos das 4 sedes
        </div>
      </CardFooter>
    </Card>
  );
}
