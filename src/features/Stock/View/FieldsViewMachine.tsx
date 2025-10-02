import { InputComponent } from "@/shared/components/InputComponent";
import { SelectComponent } from "@/shared/components/SelectComponent";
import { MoonLoader, SyncLoader } from "react-spinners";
import { ExcelData } from "../model/Stock";
import { Loader } from "@/shared/components/Loader";

const itemsBusiness = [
  {
    value: "eletrobras",
    label: "ELETROBRAS",
  },
  {
    value: "furnas",
    label: "FURNAS",
  },
  {
    value: "chesf",
    label: "CHESF",
  },
  {
    value: "eletronorte",
    label: "ELETRONORTE",
  },
  {
    value: "eletrosul",
    label: "ELETROSUL",
  },
];

const itemStatus = [
  {
    value: "available",
    label: "Disponível",
  },
  {
    value: "to_prepare",
    label: "A preparar",
  },
  {
    value: "maintenance",
    label: "Em Manutenção",
  },
  {
    value: "in_use",
    label: "Em uso",
  },
];

const itemType = [
  {
    value: "notebook",
    label: "Notebook",
  },
  {
    value: "desktop",
    label: "Desktop",
  },
];

const itemOperationalNetwork = [
  {
    value: "yes",
    label: "Sim",
  },
  {
    value: "no",
    label: "Não",
  },
];

const itemShared = [
  {
    value: "yes",
    label: "Sim",
  },
  {
    value: "no",
    label: "Não",
  },
];

interface FieldsViewMachineProps {
  loading: boolean;
  values: ExcelData;
}

export function FieldsViewMachine({ loading, values }: FieldsViewMachineProps) {
  return (
    <div className="grid lg:grid-cols-5 sm:grid-cols-3 max-sm:grid-cols-2 gap-4">
      {loading && (
        <Loader loaderIcon={<MoonLoader size={50} color="#3b82f6" />} />
      )}

      {!loading && (
        <>
          <InputComponent label="Modelo" value={values?.model} />
          <InputComponent label="Nome do ativo" value={values?.assetTag} />
          <SelectComponent
            label="Empresa"
            items={itemsBusiness}
            value={values?.company}
          />
          <SelectComponent
            label="Status"
            items={itemStatus}
            value={values?.status}
          />
          <InputComponent
            label="Data de entrada"
            type="date"
            value={values?.entryDate?.toLocaleString()}
            readonly={true}
          />
          <InputComponent
            label="Data de saida"
            type="date"
            readonly={true}
            value={values?.exitDate?.toLocaleString()}
          />
          <SelectComponent
            label="Tipo de equipamento"
            items={itemType}
            value={values?.equipmentType}
          />
          <InputComponent label="N° de serie" value={values?.serialNumber} />
          <InputComponent label="Processador" value={values?.processor} />
          <InputComponent label="Localização" value={values?.location} />
          <InputComponent label="Memória" value={values?.memory} />
          <SelectComponent
            label="Rede operacional"
            items={itemOperationalNetwork}
            value={values?.operationalNetwork}
          />
          <SelectComponent
            label="Compartilhado"
            items={itemShared}
            value={values?.shared}
          />
          <InputComponent
            label="Matricula"
            value={values?.responsiblePerson?.employeeId}
          />
          <InputComponent
            label="Pessoa responsável"
            value={values?.responsiblePerson?.name}
          />
          <InputComponent
            label="Criado em"
            type="date"
            readonly={true}
            value={values?.createdAt}
          />{" "}
          {/* Data */}
          <InputComponent
            label="Criado por"
            disabled={true}
            value={values?.createdBy}
          />
          <InputComponent
            label="Alterado em"
            type="date"
            readonly={true}
            value={values?.updatedAt}
          />{" "}
          {/* Data */}
          <InputComponent
            label="Alterado por"
            value={values?.updatedBy}
            disabled={true}
          />
        </>
      )}
    </div>
  );
}
