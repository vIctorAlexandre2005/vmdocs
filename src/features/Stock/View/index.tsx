import { CardComponent } from "@/shared/components/CardComponent";
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
import { DonutComponent } from "./donut";
import { BarComponent } from "./BarComponent";
import { OptionsTable } from "./optionsTable";

const tableHeadData = [
  "Modelo",
  "Patrimônio",
  "Empresa",
  "Status",
  "Data de Entrada",
  "Data de Saída",
  "Nome do Ativo",
  "Tipo de Equipamento",
  "Pessoa Responsável",
  "Matrícula",
  "Número de Série",
  "Fabricante",
  "Processador",
  "Localidade",
  "Memória",
  "Nº do Chamado",
  "Rede Operativa",
  "Compartilhado",
  "Observação",
];

const notebooks = [
  {
    id: 1,
    modelo: "DELL Latitude 3450 i5",
    patrimonio: "PAT123456",
    empresa: "Eletrobras",
    status: "Em uso",
    dataEntrada: "12/08/2023",
    dataSaida: "25/09/2023",
    nomeAtivo: "Notebook Administrativo",
    tipoEquipamento: "Notebook",
    pessoa: "João Silva",
    matricula: "123456",
    numeroSerie: "SN987654321",
    fabricante: "Dell",
    processador: "Intel Core i5-7200U",
    localidade: "Rio de Janeiro - Sede",
    memoria: "8GB",
    chamado: "CHM-2023-0045",
    redeOperativa: "Sim",
    compartilhado: "Não",
    observacao: "Equipamento destinado ao setor financeiro",
  },
  {
    id: 2,
    modelo: "DELL Precision 5450 i7",
    patrimonio: "PAT654321",
    empresa: "CHESF",
    status: "Disponível",
    dataEntrada: "15/09/2023",
    dataSaida: "",
    nomeAtivo: "Notebook Engenharia",
    tipoEquipamento: "Notebook",
    pessoa: "",
    matricula: "",
    numeroSerie: "SN123456789",
    fabricante: "Dell",
    processador: "Intel Core i7-11800H",
    localidade: "Pernambuco - Sede",
    memoria: "16GB",
    chamado: "",
    redeOperativa: "Não",
    compartilhado: "Sim",
    observacao: "Novo em estoque",
  },
];

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
    <div className="flex flex-col p-4 w-11/12 gap-4">
      <h1 className="text-2xl text-slate-700 font-semibold">Notebooks</h1>
      <div className="cards flex justify-between w-full gap-4 items-center">
        {itemCards.map((item) => (
          <CardComponent
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

      <div className="p-4 shadow-sm w-full max-w-full border rounded-2xl bg-white">
        <div className="flex justify-between items-center mb-4 gap-4">
          <OptionsTable
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            search={search}
            setSearch={setSearch}
          />
        </div>

        <Table className="rounded-2xl shadow-sm overflow-hidden">
          <TableHeader>
            <TableRow className="font-bold">
              {tableHeadData.map((item) => (
                <TableHead key={item} className="text-slate-700 font-bold">
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="text-slate-600">
            {notebooks.length > 0 ? (
              notebooks.map((nb) => (
                <TableRow key={nb.id} className="hover:bg-slate-50 transition">
                  {Object.values(nb)
                    .slice(1)
                    .map((value, index) => (
                      <TableCell key={index} className="whitespace-nowrap p-6">
                        {index === 3 ? ( // Status está na posição 2 (ajuste conforme a ordem real)
                          <span
                            className={`${
                              value === "Disponível"
                                ? "bg-indigo-100 p-2 rounded-full border border-indigo-300 text-indigo-500"
                                : value === "Em uso"
                                ? "bg-orange-100 p-2 rounded-full border border-orange-300 text-orange-500"
                                : value === "Manutenção"
                                ? "bg-red-100 p-2 rounded-full border border-red-300 text-red-500"
                                : "bg-sky-100 p-2 rounded-full border border-sky-300 text-sky-500"
                            }`}
                          >
                            {value}
                          </span>
                        ) : (
                          value || "-"
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableHeadData.length}
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
