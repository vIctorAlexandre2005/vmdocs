interface InputComponentProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export function InputComponent({
  label,
  placeholder,
  value,
  onChange,
  className,
}: InputComponentProps) {
  return (
    <div className="flex w-full flex-col mb-4">
      <label className="block text-sm font-bold text-gray-700 mb-2">
        {label} *
      </label>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 transition duration-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
