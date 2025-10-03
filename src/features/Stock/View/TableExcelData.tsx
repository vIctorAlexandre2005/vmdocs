import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { ExcelData, StockDataUpdate } from "../model/Stock";
import { DialogComponent } from "@/shared/components/dialogs/dialog";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Button } from "@/shared/components/ui/button";
import { ChevronDownIcon, Edit, Trash2 } from "lucide-react";
import { Calendar } from "@/shared/components/ui/calendar";
import { useRouter } from "next/router";
import { useDataExcel } from "../viewModel/useDataExcel";
import { RiEditBoxLine } from "react-icons/ri";
import { FieldsViewMachine } from "./FieldsViewMachine";
import { useContextStock } from "@/shared/contexts/StockContext";
import { ButtonComponent } from "@/shared/components/ButtonComponent";

const tableHeadData = [
  "Ação",
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
  const [open, setOpen] = useState(false);
  const {
    loadingDataById,
    tableDataById,
    getDataById,
    updateMachine,
    deleteMachine,
  } = useDataExcel();

  const {
    updateId,
    setUpdateId,
    updateModel,
    setUpdateModel,
    updateAssetTag,
    setUpdateAssetTag,
    updateCompany,
    setUpdateCompany,
    updateStatus,
    setUpdateStatus,
    entryDate,
    setEntryDate,
    exitDate,
    setExitDate,
    updateTypeEquipment,
    setUpdateTypeEquipment,
    updateResponsibleEmployeeId,
    setUpdateResponsibleEmployeeId,
    updateResponsibleName,
    setUpdateResponsibleName,
    updateSerialNumber,
    setUpdateSerialNumber,
    processor,
    setProcessor,
    location,
    setLocation,
    memory,
    setMemory,
    ticketNumber,
    setTicketNumber,
    updateObservation,
    setUpdateObservation,
    updateOperationalNetwork,
    setUpdateOperationalNetwork,
    updateShared,
    setUpdateShared,
  } = useContextStock();

  const object: StockDataUpdate = {
    model: updateModel,
    assetTag: updateAssetTag,
    company: updateCompany,
    status: updateStatus,
    entryDate: new Date(entryDate),
    exitDate: new Date(exitDate),
    equipmentType: updateTypeEquipment,
    responsiblePerson: {
      employeeId: updateResponsibleEmployeeId,
      name: updateResponsibleName,
    },
    serialNumber: updateSerialNumber,
    processor: processor,
    location: location,
    memory: memory,
    ticketNumber: ticketNumber,
    notes: updateObservation,
    operationalNetwork: updateOperationalNetwork,
    shared: updateShared,
  };

  console.log("dados", updateAssetTag);
  return (
    <Table className="rounded-2xl shadow-sm overflow-auto">
      <TableHeader>
        <TableRow className="font-bold">
          {tableHeadData.map((item) => (
            <TableHead
              key={item}
              className="text-slate-700 text-center font-bold"
            >
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {excelData.map((row: ExcelData) => (
          <TableRow className="text-center" key={row.id}>
            <TableCell className="flex gap-2">
              <DialogComponent
                classNameTrigger="p-2 rounded-full cursor-pointer bg-indigo-500"
                onClick={() => deleteMachine(row?.id)}
                textButtonConfirm="Sim, excluir"
                textButtonCancel="Cancelar"
                iconTriggerLeft={<Trash2 size={20} color="#fff" />}
                isDelete={true}
                title={`"Deseja excluir o equipamento ${row.assetTag}?"`}
              />
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.model}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.assetTag}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.company}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
              className={``}
            >
              <div
                className={`${
                  row.status.toLowerCase() === "em estoque"
                    ? "bg-green-100 text-green-600 border-green-200"
                    : row.status.toLowerCase() === "em uso"
                    ? "bg-orange-100 text-orange-600 border-orange-300"
                    : row.status.toLowerCase() === "em manutenção"
                    ? "bg-red-100 text-red-600 border-red-300"
                    : row.status.toLowerCase() === "disponível"
                    ? "bg-blue-100 text-blue-600 border-blue-300"
                    : "bg-slate-100 text-slate-600 border-slate-300"
                } p-2 font-semibold w-fit border rounded-full text-center`}
              >
                {row.status}
              </div>
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.entryDate
                ? new Date(row.entryDate).toLocaleDateString("pt-BR")
                : "-"}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.exitDate
                ? new Date(row.exitDate).toLocaleDateString("pt-BR")
                : "-"}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.equipmentType}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.responsiblePerson?.name || "-"}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.responsiblePerson?.employeeId || "-"}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.serialNumber}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.manufacturer}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.processor}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.location}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.memory}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.ticketNumber || "-"}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.operationalNetwork}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.shared}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.notes || "-"}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.createdAt ? new Date(row.createdAt).toLocaleString() : "-"}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.createdBy}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.updatedAt ? new Date(row.updatedAt).toLocaleString() : "-"}
            </TableCell>
            <TableCell
              onClick={() => {
                getDataById(row.id);
                setOpen(true);
              }}
            >
              {row.updatedBy}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <DialogComponent
        open={open}
        onOpenChange={setOpen}
        className=""
        textTrigger=""
        textButtonCancel="Cancelar"
        textButtonConfirm="Alterar"
        title="Alterar dados da máquina"
        crud={true}
        iconRightButton={<RiEditBoxLine size={20} />}
        onClick={() => updateMachine(updateId, object)}
      >
        <FieldsViewMachine
          key={tableDataById?.id}
          loadingDataById={loadingDataById}
          tableDataById={tableDataById}
        />
      </DialogComponent>
    </Table>
  );
}
