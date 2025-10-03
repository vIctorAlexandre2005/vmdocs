import { useFormContext } from "../contexts/FormProvider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type SelectComponentProps = {
  name: string; // campo que será salvo (ex: "status")
  label?: string;
  items: { value: string; label: string }[];
  required?: boolean;
};

export function SelectComponent({
  label,
  items,
  required,
  name,
}: SelectComponentProps) {
  const { updateField, formData } = useFormContext();
  return (
    <div className="flex flex-col">
      <label className="flex gap-2 font-bold mb-2 text-gray-700">
        {label} {required && <p className="text-red-500">*</p>}
      </label>
      <Select
        value={formData[name] || ""}
        onValueChange={(val) => updateField(name, val)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={name || label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {label && <SelectLabel>{label || "Selecione uma opção"}</SelectLabel>}
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
