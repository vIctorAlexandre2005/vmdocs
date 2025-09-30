import { CardComponent } from "@/shared/components/CardComponent";
import { TrendingUp } from "lucide-react";
import { FaLaptop, FaLaptopHouse } from "react-icons/fa";
import { LuLaptopMinimalCheck } from "react-icons/lu";
import { TbSettingsUp } from "react-icons/tb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import React, { useState } from "react";
import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { DonutComponent } from "./donut";
import { BarComponent } from "./BarComponent";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { InputComponent } from "@/shared/components/InputComponent";
import { GoSearch } from "react-icons/go";

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

const users: LaptopStatus[] = [
  {
    id: 1,
    name: "Victor Alexandre",
    email: "victor@email.com",
    role: "Desenvolvedor",
    status: "Disponível",
  },
  {
    id: 2,
    name: "Maria Souza",
    email: "maria@email.com",
    role: "Designer",
    status: "Em uso",
  },
  {
    id: 3,
    name: "João Silva",
    email: "joao@email.com",
    role: "Gerente",
    status: "Manutenção",
  },
  {
    id: 4,
    name: "Ana Clara",
    email: "ana@email.com",
    role: "Marketing",
    status: "Em uso",
  },
  {
    id: 5,
    name: "Pedro Lima",
    email: "pedro@email.com",
    role: "Financeiro",
    status: "A preparar",
  },
  {
    id: 6,
    name: "Lucas Mendes",
    email: "lucas@email.com",
    role: "DevOps",
    status: "Manutenção",
  },
];

export function StockComponent() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 3;

  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(search)
  );

  // Paginação
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  return (
    <div className="flex flex-col p-4 gap-4">
      <h1 className="text-2xl text-slate-700 font-semibold">Notebooks</h1>
      <div className="cards flex justify-around gap-4 items-center">
        {itemCards.map((item) => (
          <CardComponent
            icon={<item.icon size={24} />}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>

      <div className="w-full flex items-start justify-center gap-4">
        <DonutComponent />
        <BarComponent />
      </div>

      <div className="p-4 shadow-sm border rounded-2xl bg-white">
        <div className="flex justify-between items-center mb-4 gap-4">
          <div className="w-1/4 flex items-center gap-2">
            <GoSearch size={20} color="#a3a3a3" />
            <InputComponent
              label=""
              placeholder="Buscar"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="border-slate-300 p-2 text-slate-700 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              Página {page} de {totalPages || 1}
            </span>
            <div className="flex gap-2">
              <ButtonComponent
                className="border-slate-300 text-slate-700"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                iconLeft={<MdOutlineArrowBackIos size={20} />}
              />
              <ButtonComponent
                className="border-slate-300 text-slate-700"
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(page + 1)}
                iconLeft={<MdOutlineArrowForwardIos size={20} />}
              />
            </div>
          </div>
        </div>

        <Table className="rounded-2xl shadow-sm overflow-hidden">
          <TableHeader>
            <TableRow className="font-bold">
              <TableHead className="text-slate-700 font-bold">Nome</TableHead>
              <TableHead className="text-slate-700 font-bold">Email</TableHead>
              <TableHead className="text-slate-700 font-bold">Cargo</TableHead>
              <TableHead className="text-right text-slate-700 font-bold">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-slate-600">
            {paginated.length > 0 ? (
              paginated.map((user) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-slate-50 transition"
                >
                  <TableCell className="">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className={`text-right font-bold p-4`}>
                    <span
                      className={`${
                        user.status === "Disponível"
                          ? "bg-indigo-100 p-2 rounded-full border border-indigo-300 text-indigo-500"
                          : user.status === "Em uso"
                          ? "bg-orange-100 p-2 rounded-full border border-orange-300 text-orange-500"
                          : user.status === "Manutenção"
                          ? "bg-red-100 p-2 rounded-full border border-red-300 text-red-500"
                          : "bg-sky-100 p-2 rounded-full border border-sky-300 text-sky-500"
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-gray-500 py-4"
                >
                  Nenhum resultado encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
