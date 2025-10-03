import { InputComponent } from "@/shared/components/InputComponent";
import { SelectComponent } from "@/shared/components/SelectComponent";
import { MoonLoader, SyncLoader } from "react-spinners";
import { ExcelData } from "../model/Stock";
import { Loader } from "@/shared/components/Loader";
import { Textarea } from "@/shared/components/ui/textarea";
import { TextareaComponent } from "@/shared/components/TextareaComponent";
import { useFormContext } from "@/shared/contexts/FormProvider";

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
  const { updateField } = useFormContext();
  return (
    <div className="space-y-8">
      {/* Seção: Dados do Equipamento */}
      <div className="p-4 border rounded-xl">
        <h2 className="text-lg font-semibold mb-4 text-indigo-600">
          Dados do Equipamento
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputComponent
            value={tableDataById?.model}
            onChange={(e) => updateField("model", e.target.value)}
            label="Modelo"
            placeholder="Modelo"
          />
          <InputComponent
            value={tableDataById?.assetTag}
            onChange={(e) => updateField("assetTag", e.target.value)}
            label="Nome do ativo"
            placeholder="Nome do ativo"
          />
          <SelectComponent
            label="Empresa"
            items={itemsBusiness}
            name={tableDataById?.company}
          />
          <SelectComponent
            label="Status"
            items={itemStatus}
            name={tableDataById?.status}
          />
          <InputComponent
            value={new Date(tableDataById?.entryDate).toLocaleDateString()}
            onChange={(e) => updateField("entryDate", e.target.value)}
            label="Data de entrada"
            type="text"
            readonly={true}
          />
          {/* <InputComponent
            value={tableDataById?.exitDate}
            onChange={(e) => updateField("exitDate", e.target.value)}
            label="Data de saída"
            type="date"
            readonly={true}
          /> */}
          <SelectComponent
            label="Tipo de equipamento"
            items={itemType}
            name={tableDataById?.equipmentType}
          />
          <InputComponent
            value={tableDataById?.serialNumber}
            onChange={(e) => updateField("serialNumber", e.target.value)}
            label="N° de série"
            placeholder="N° de série"
          />
          <InputComponent
            value={tableDataById?.processor}
            onChange={(e) => updateField("processor", e.target.value)}
            label="Processador"
            placeholder="Processador"
          />
          <InputComponent
            value={tableDataById?.location}
            onChange={(e) => updateField("location", e.target.value)}
            label="Localização"
            placeholder="Localização"
          />
          <InputComponent
            value={tableDataById?.memory}
            onChange={(e) => updateField("memory", e.target.value)}
            label="Memória RAM"
            placeholder="Memória"
          />
          <SelectComponent
            label="Rede operacional"
            items={itemOperationalNetwork}
            name={tableDataById?.operationalNetwork}
          />
          <SelectComponent
            name={tableDataById?.shared}
            label="Compartilhado"
            items={itemShared}
          />
          <TextareaComponent
            placeholder="Observações"
            className="resize-none w-full"
            label="Observações"
            value={tableDataById?.notes}
            onChange={(e) => updateField("notes", e.target.value)}
          />
        </div>
      </div>

      {/* Seção: Pessoa Responsável */}
      {/* <div className="p-4 border rounded-xl">
        <h2 className="text-lg font-semibold mb-4 text-indigo-600">
          Pessoa Responsável
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputComponent
            value={tableDataById?.name}
            onChange={(e) => updateField("name", e.target.value)}
            label="Nome"
            placeholder="Nome"
          />
          <InputComponent
            value={tableDataById?.employeeId}
            onChange={(e) => updateField("employeeId", e.target.value)}
            label="Matrícula"
            placeholder="Matrícula"
          />
        </div>
      </div> */}

      {/* Seção: Controle de Criação/Alteração */}
      {/* <div className="p-4 border rounded-xl">
        <h2 className="text-lg font-semibold mb-4 text-indigo-600">
          Controle de Criação/Alteração
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputComponent
            value={tableDataById?.createdAt}
            onChange={(e) => updateField("createdAt", e.target.value)}
            label="Criado em"
            type="date"
            readonly={true}
          />
          <InputComponent
            value={tableDataById?.createdBy}
            onChange={(e) => updateField("createdBy", e.target.value)}
            label="Criado por"
            disabled={true}
          />
          <InputComponent
            value={tableDataById?.updatedAt}
            onChange={(e) => updateField("updatedAt", e.target.value)}
            label="Alterado em"
            type="date"
            readonly={true}
          />
          <InputComponent
            value={tableDataById?.updatedBy}
            onChange={(e) => updateField("updatedBy", e.target.value)}
            label="Alterado por"
            disabled={true}
          />
        </div>
      </div> */}
    </div>
  );
}
