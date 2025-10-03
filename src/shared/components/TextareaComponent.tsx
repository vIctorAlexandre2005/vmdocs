import { Textarea } from "./ui/textarea";

interface TextareaProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export function TextareaComponent({
  label,
  onChange,
  placeholder,
  className,
  value,
}: TextareaProps) {
  return (
    <div className="flex flex-col w-full">
      <label className="block font-bold mb-2 text-gray-700">{label}</label>
      <Textarea
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
