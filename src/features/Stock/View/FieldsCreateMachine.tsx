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

export function FieldsCreateMachine() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 max-sm:grid-cols-2 gap-4">
      <InputComponent label="Modelo" placeholder="Modelo" />
      <InputComponent label="Nome do ativo" placeholder="Nome do ativo" />
      <SelectComponent label="Empresa" items={itemsBusiness} placeholder="Empresa" />
      <SelectComponent label="Status" items={itemStatus} placeholder="Status"/>
      <InputComponent label="Data de entrada" type="date" readonly={true} />
      <InputComponent label="Data de saida" type="date" readonly={true} />
      <SelectComponent label="Tipo de equipamento" items={itemType} placeholder="Tipo de equipamento" />
      <InputComponent label="N° de serie" placeholder="N° de serie" />
      <InputComponent label="Processador" placeholder="Processador" />
      <InputComponent label="Localização" placeholder="Localização" />
      <InputComponent label="Memória" placeholder="Memória" />
      <SelectComponent
        label="Rede operacional"
        items={itemOperationalNetwork}
      />
      <SelectComponent label="Compartilhado" items={itemShared} />
      <InputComponent label="Matricula" placeholder="Matricula" />
      <InputComponent label="Pessoa responsável" placeholder="Pessoa responsável" />
      <InputComponent label="Criado em" type="date" readonly={true} />{" "}
      {/* Data */}
      <InputComponent label="Criado por" disabled={true} />
      <InputComponent label="Alterado em" type="date" readonly={true} />{" "}
      {/* Data */}
      <InputComponent label="Alterado por" disabled={true} />
    </div>
  );
}
