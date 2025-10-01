import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { ExcelData } from "../model/Stock";
const tableHeadData = [
  "Modelo",
  "Nome do Ativo",
  //"Patrimônio",
  "Empresa",
  "Status",
  "Data de Entrada",
  "Data de Saída",
  "Tipo de Equipamento",
  "Responsável do Equipamento",
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
  "Criado em",
  "Criado por",
  "Alterado em",
  "Alterado por",
];

interface TableExcelProps {
  excelData: any[];
}

export function TableExcelData({ excelData }: TableExcelProps) {
  return (
    <Table className="rounded-2xl shadow-sm overflow-hidden">
      <TableHeader>
        <TableRow className="font-bold">
          {tableHeadData.map((item) => (
            <TableHead key={item} className="text-slate-700 text-center font-bold">
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {excelData.map((row: ExcelData) => (
          <TableRow className="text-center" key={row.id}>
            <TableCell>{row.model}</TableCell>
            <TableCell>{row.assetTag}</TableCell>
            <TableCell>{row.company}</TableCell>
            <TableCell className={``}>
              <div
                className={`${
                  row.status.toLowerCase() === "em estoque"
                    ? "bg-green-100 text-green-600 border-green-200"
                    : row.status.toLowerCase() === "em uso"
                    ? "bg-orange-100 text-orange-600 border-orange-300"
                    : row.status.toLowerCase() === "em manutenção"
                    ? "bg-red-100 text-red-600 border-red-300"
                    : "bg-blue-100 text-blue-600 border-blue-200"
                } p-2 font-semibold border rounded-full text-center`}
              >
                {row.status}
              </div>
            </TableCell>
            <TableCell>{row.entryDate}</TableCell>
            <TableCell>{row.exitDate || "-"}</TableCell>
            <TableCell>{row.equipmentType}</TableCell>
            <TableCell>
              {row.responsiblePerson ? `${row.responsiblePerson.name}` : "-"}
            </TableCell>
            <TableCell>{row.responsiblePerson?.employeeId}</TableCell>
            <TableCell>{row.serialNumber}</TableCell>
            <TableCell>{row.manufacturer}</TableCell>
            <TableCell>{row.processor}</TableCell>
            <TableCell>{row.location}</TableCell>
            <TableCell>{row.memory}</TableCell>
            <TableCell>{row.ticketNumber || "-"}</TableCell>
            <TableCell>{row.operationalNetwork}</TableCell>
            <TableCell>{row.shared}</TableCell>
            <TableCell>{row.notes || "-"}</TableCell>
            <TableCell>{row.createdAt}</TableCell>
            <TableCell>{row.createdBy}</TableCell>
            <TableCell>{row.updatedAt}</TableCell>
            <TableCell>{row.updatedBy}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
