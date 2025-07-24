import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

export function TableWithData() {
  return (
    <Table className="text-slate-800">
      <TableCaption className="p-4">
        A list of your recent invoices.
      </TableCaption>
      <TableHeader className="border-t p-4">
        <TableRow className="text-slate-800 p-4">
          <TableHead className="text-slate-800 font-bold p-4">
            Nome do arquivo
          </TableHead>
          <TableHead className="text-slate-800 p-4 font-bold">
            Data de criação
          </TableHead>
          <TableHead className="text-slate-800 p-4 font-bold">
            Última alteração
          </TableHead>
          <TableHead className=" p-4 font-bold text-slate-800">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        <TableRow className="cursor-pointer">
          <TableCell className="font-medium p-4">INV001</TableCell>
          <TableCell className="font-medium p-4">Paid</TableCell>
          <TableCell className="font-medium p-4">Credit Card</TableCell>
          <TableCell className="">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
