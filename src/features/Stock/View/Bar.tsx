import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  {
    company: "CHESF",
    34405: 40,
    34505: 35,
    34507: 30,
    54505: 70,
    54507: 55,
  },
  {
    company: "ELETROBRAS",
    34405: 40,
    34505: 35,
    34507: 30,
    54505: 70,
    54507: 55,
  },
  {
    company: "ELETRONORTE",
    34405: 40,
    34505: 35,
    34507: 30,
    54505: 70,
    54507: 55,
  },
  {
    company: "ELETROSUL",
    34405: 40,
    34505: 35,
    34507: 30,
    54505: 70,
    54507: 55,
  },
];
const chartConfig = {
  34405: {
    label: "3440 I5",
    color: "#bfd3fe",
  },
  34505: {
    label: "3450 I5",
    color: "#93b4fd",
  },
  34507: {
    label: "3450 I7",
    color: "#3b76f6",
  },
  54505: {
    label: "5450 I5",
    color: "#1d58d8",
  },
  54507: {
    label: "5450 I7",
    color: "#1e408a",
  },
} satisfies ChartConfig;

export function BarGraph() {
  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="company"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="34405" fill="var(--color-34405)" radius={4} />
        <Bar dataKey="34505" fill="var(--color-34505)" radius={4} />
        <Bar dataKey="34507" fill="var(--color-34507)" radius={4} />
        <Bar dataKey="54505" fill="var(--color-54505)" radius={4} />
        <Bar dataKey="54507" fill="var(--color-54507)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
