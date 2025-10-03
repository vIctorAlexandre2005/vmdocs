import { Card, CardContent } from "@/components/ui/card";
import React, { JSX } from "react";
import { IconType } from "react-icons/lib";

interface CardComponentProps {
  icon: JSX.Element;
  title: string;
  value: number;
}
export function CardComponent({ icon, title, value }: CardComponentProps) {
  return (
    <Card onClick={() => {}} className="w-full border-none shadow hover:scale-90 transition duration-300 rounded-4xl">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-indigo-100 rounded-full text-indigo-500 border border-indigo-400">
            {icon}
          </span>
          <span className="text-lg font-semibold">{title}</span>
        </div>
        <span className="text-3xl opacity-85 font-bold">{value}</span>
      </CardContent>
    </Card>
  );
}
