import { InputComponent } from "@/shared/components/InputComponent";
import { SelectComponent } from "@/shared/components/SelectComponent";
import { MoonLoader, SyncLoader } from "react-spinners";
import { ExcelData } from "../model/Stock";
import { Loader } from "@/shared/components/Loader";
import { Textarea } from "@/shared/components/ui/textarea";
import { TextareaComponent } from "@/shared/components/TextareaComponent";
import { useFormContext } from "@/shared/contexts/FormProvider";
import { useEffect, useState } from "react";
import { useContextStock } from "@/shared/contexts/StockContext";

const itemsBusiness = [
  {
    value: "ELETROBRAS",
    label: "ELETROBRAS",
  },
  {
    value: "FURNAS",
    label: "FURNAS",
  },
  {
    value: "CHESF",
    label: "CHESF",
  },
  {
    value: "ELETRONORTE",
    label: "ELETRONORTE",
  },
  {
    value: "ELETROSUL",
    label: "ELETROSUL",
  },
];

const itemStatus = [
  {
    value: "Disponível",
    label: "Disponível",
  },
  {
    value: "A preparar",
    label: "A preparar",
  },
  {
    value: "Em Manutenção",
    label: "Em Manutenção",
  },
  {
    value: "Em uso",
    label: "Em uso",
  },
];

const itemType = [
  {
    value: "Notebook",
    label: "Notebook",
  },
  {
    value: "Desktop",
    label: "Desktop",
  },
];

const itemOperationalNetwork = [
  {
    value: "Sim",
    label: "Sim",
  },
  {
    value: "Não",
    label: "Não",
  },
];

const itemShared = [
  {
    value: "Sim",
    label: "Sim",
  },
  {
    value: "Não",
    label: "Não",
  },
];

type FieldsViewMachineProps = {
  tableDataById: ExcelData;
  loadingDataById: boolean;
};

export function FieldsViewMachine({
  loadingDataById,
  tableDataById,
}: FieldsViewMachineProps) {
  const { formData, updateField } = useFormContext();

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

  // quando receber novos dados do back, joga no contexto
  useEffect(() => {
    if (tableDataById) {
      setUpdateId(tableDataById.id);
      setUpdateModel(tableDataById.model);
      setUpdateAssetTag(tableDataById.assetTag);
      setUpdateCompany(tableDataById.company);
      setUpdateStatus(tableDataById.status);
      setEntryDate(new Date(tableDataById.entryDate).toLocaleDateString());
      setExitDate(
        tableDataById?.exitDate
          ? new Date(tableDataById.exitDate).toLocaleDateString()
          : ""
      );
      setUpdateTypeEquipment(tableDataById.equipmentType);
      setUpdateResponsibleEmployeeId(
        tableDataById.responsiblePerson?.employeeId || ""
      );
      setUpdateResponsibleName(tableDataById.responsiblePerson?.name || "");
      setUpdateSerialNumber(tableDataById.serialNumber);
      setProcessor(tableDataById.processor);
      setLocation(tableDataById.location);
      setMemory(tableDataById.memory);
      setTicketNumber(tableDataById.ticketNumber || "");
      setUpdateObservation(tableDataById.notes || "");
      setUpdateOperationalNetwork(tableDataById.operationalNetwork);
      setUpdateShared(tableDataById.shared);
    }
  }, [tableDataById]);
  return (
    <div className="space-y-8">
      {/* Seção: Dados do Equipamento */}
      <div className="p-4 border rounded-xl">
        <h2 className="text-lg font-semibold mb-4 text-indigo-600">
          Dados do Equipamento
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputComponent
            value={updateModel}
            onChange={(e) => setUpdateModel(e.target.value)}
            label="Modelo"
            placeholder="Modelo"
          />
          <InputComponent
            value={updateAssetTag}
            onChange={(e) => setUpdateAssetTag(e.target.value)}
            label="Nome do ativo"
            placeholder="Nome do ativo"
          />
          <SelectComponent
            label="Empresa"
            items={itemsBusiness}
            name={updateCompany}
          />
          <SelectComponent
            label="Status"
            items={itemStatus}
            name={updateStatus}
          />
          <InputComponent
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            label="Data de entrada"
            type="text"
            readonly={true}
          />
          <InputComponent
            value={exitDate}
            onChange={(e) => setExitDate(e.target.value)}
            label="Data de saída"
            type="date"
          />
          <SelectComponent
            label="Tipo de equipamento"
            items={itemType}
            name={updateTypeEquipment}
          />
          <InputComponent
            value={updateSerialNumber}
            onChange={(e) => setUpdateSerialNumber(e.target.value)}
            label="N° de série"
            placeholder="N° de série"
          />
          <InputComponent
            value={processor}
            onChange={(e) => setProcessor(e.target.value)}
            label="Processador"
            placeholder="Processador"
          />
          <InputComponent
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            label="Localização"
            placeholder="Localização"
          />
          <InputComponent
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
            label="Memória RAM"
            placeholder="Memória"
          />
          <InputComponent
            value={ticketNumber}
            onChange={(e) => setTicketNumber(e.target.value)}
            label="N° do chamado"
            placeholder="Chamado"
          />
          <SelectComponent
            label="Rede operacional"
            items={itemOperationalNetwork}
            name={updateOperationalNetwork}
          />
          <SelectComponent
            name={updateShared}
            label="Compartilhado"
            items={itemShared}
          />
          <TextareaComponent
            placeholder="Observações"
            className="resize-none w-full"
            label="Observações"
            value={updateObservation}
            onChange={(e) => setUpdateObservation(e.target.value)}
          />
        </div>
      </div>

      {/* Seção: Pessoa Responsável */}
      <div className="p-4 border rounded-xl">
        <h2 className="text-lg font-semibold mb-4 text-indigo-600">
          Pessoa Responsável
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputComponent
            value={updateResponsibleName}
            onChange={(e) => setUpdateResponsibleName(e.target.value)}
            label="Nome"
            placeholder="Nome"
          />
          <InputComponent
            value={updateResponsibleEmployeeId}
            onChange={(e) => setUpdateResponsibleEmployeeId(e.target.value)}
            label="Matrícula"
            placeholder="Matrícula"
          />
        </div>
      </div>

      {/* Seção: Controle de Criação/Alteração */}
      {/* <div className="p-4 border rounded-xl">
        <h2 className="text-lg font-semibold mb-4 text-indigo-600">
          Controle de Criação/Alteração
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputComponent
            value=
            onChange={(e) => updateField("createdAt", e.target.value)}
            label="Criado em"
            type="date"
            readonly={true}
          />
          <InputComponent
            value=
            onChange={(e) => updateField("createdBy", e.target.value)}
            label="Criado por"
            disabled={true}
          />
          <InputComponent
            value=
            onChange={(e) => updateField("updatedAt", e.target.value)}
            label="Alterado em"
            type="date"
            readonly={true}
          />
          <InputComponent
            value=
            onChange={(e) => updateField("updatedBy", e.target.value)}
            label="Alterado por"
            disabled={true}
          />
        </div>
      </div> */}
    </div>
  );
}
