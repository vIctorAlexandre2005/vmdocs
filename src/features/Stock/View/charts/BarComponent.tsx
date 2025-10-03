import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { BarGraph } from "./Bar";

export function BarComponent() {
  return (
    <Card className="w-8/12">
      <CardHeader>
        <CardTitle>Visão Geral de todas as Sedes</CardTitle>
        <CardDescription>
          CHESF - ELETROBRAS - ELETRONORTE - ELETROSUL
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BarGraph />
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
  );
}
