import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SelectComponentProps {
  label: string;
  placeholder?: string;
  items?: any[];
  value?: string;
}

export function SelectComponent({
  label,
  items,
  placeholder,
  value
}: SelectComponentProps) {
  return (
    <div className="flex flex-col">
      <label className="block font-bold mb-2 text-gray-700">{label}</label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={value} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{value}</SelectLabel>
            {items?.map((item) => (
              <SelectItem key={label} value={item.value || value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
