import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { usePdfData } from "@/features/Upload/viewModel/usePdfData";
import { ButtonComponent } from "@/shared/components/ButtonComponent";

export function TableWithData() {
  const { dataPdf } = usePdfData();
  return (
    <div className="max-h-[400px] overflow-y-auto">
      <Table className="text-slate-800">
        <TableHeader className="border-t p-2">
          <TableRow className="text-slate-800 text-sm p-2">
            <TableHead className="text-slate-800 font-bold p-2">
              Nome do termo
            </TableHead>
            <TableHead className="text-slate-800 p-2 font-bold">
              Colaborador
            </TableHead>
            <TableHead className="text-slate-800 p-2 font-bold">
              Incidente/Requisição
            </TableHead>
            <TableHead className=" p-2 font-bold text-slate-800">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs">
          {dataPdf?.map((pdf) => (
            <TableRow key={pdf.id} className="cursor-pointer">
              <TableCell className="font-semibold p-2">
                {pdf.file_name}
              </TableCell>
              <TableCell className="font-semibold p-2">
                {pdf.collaborator}
              </TableCell>
              <TableCell className="font-semibold p-2">{pdf.inc_req}</TableCell>
              <TableCell className="p-2 font-semibold flex items-center">
                <ButtonComponent text="Excluir" className="" />
                <ButtonComponent text="Editar" className="" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
