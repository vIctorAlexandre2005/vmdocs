import { InputComponent } from "@/shared/components/InputComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { DataExtractedPdfProps } from "@/shared/contexts/UploadPdfContext";

export function FieldsPreview({
  data,
  idx,
  updateField,
}: {
  data: DataExtractedPdfProps;
  idx: number;
  updateField: (
    idx: number,
    field: keyof DataExtractedPdfProps,
    value: string
  ) => void;
}) {
  return (
    <>
      <InputComponent
        className="w-full p-2"
        value={data?.incident_request}
        onChange={(e) => updateField(idx, "incident_request", e.target.value)}
        label="Incidente/Requisição"
      />
      <InputComponent
        className="w-full p-2"
        value={data?.registration}
        onChange={(e) => updateField(idx, "registration", e.target.value)}
        label="Matrícula do colaborador"
      />
      <InputComponent
        className="w-full p-2"
        value={data?.collaborator}
        onChange={(e) => updateField(idx, "collaborator", e.target.value)}
        label="Nome do colaborador"
      />
      <InputComponent
        className="w-full p-2"
        value={data?.group}
        onChange={(e) => updateField(idx, "group", e.target.value)}
        label="Grupo do colaborador"
      />
      <InputComponent
        className="w-full p-2"
        value={data?.vp}
        onChange={(e) => updateField(idx, "vp", e.target.value)}
        label="VP do colaborador"
      />
      <InputComponent
        className="w-full p-2"
        value={data?.uo}
        onChange={(e) => updateField(idx, "uo", e.target.value)}
        label="UO do colaborador"
      />
      <InputComponent
        className="w-full p-2"
        value={data?.company}
        onChange={(e) => updateField(idx, "company", e.target.value)}
        label="Empresa"
      />
      <InputComponent
        className="w-full p-2"
        value={data?.location}
        onChange={(e) => updateField(idx, "location", e.target.value)}
        label="Localização"
      />
      <InputComponent
        className="w-full p-2"
        value={data?.manager}
        onChange={(e) => updateField(idx, "manager", e.target.value)}
        label="Gestor Imediato"
      />
      <InputComponent
        className="w-full p-2"
        value={data?.brand_model}
        onChange={(e) => updateField(idx, "brand_model", e.target.value)}
        label="Marca / Modelo do equipamento"
      />
      <InputComponent
        value={data?.patrimony}
        onChange={(e) => updateField(idx, "patrimony", e.target.value)}
        className="w-full p-2"
        label="Patrimônio do equipamento"
      />
      <InputComponent
        value={data?.type_of_equipment_delivery}
        onChange={(e) =>
          updateField(idx, "type_of_equipment_delivery", e.target.value)
        }
        className="w-full p-2"
        label="Tipo do equipamento"
      />
      <InputComponent
        value={data?.returned_equipment}
        onChange={(e) => updateField(idx, "returned_equipment", e.target.value)}
        className="w-full p-2"
        label="Equipamento Devolvido"
      />
      <div className="w-full">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Tipo de Movimento
        </label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue
              defaultValue={data?.type_of_movement}
              placeholder={data?.type_of_movement}
            />
          </SelectTrigger>
          <SelectContent>
            {["ENTREGA", "RECOLHIMENTO", "TROCA"].map((type) => (
              <SelectItem
                key={type}
                value={type}
                onClick={() => updateField(idx, "type_of_movement", type)}
              >
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
