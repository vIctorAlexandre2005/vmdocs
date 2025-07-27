import { LuSearchX } from "react-icons/lu";

interface InputComponentProps {
  label: string;
  placeholder?: string;
  value?: string;
  classNameLabel?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  iconInside?: React.ReactNode;
}

export function InputComponent({
  label,
  placeholder,
  value,
  onChange,
  className,
  iconInside,
  classNameLabel
}: InputComponentProps) {
  return (
    <div className="flex w-full flex-col">
      <label className={`block font-bold mb-2 text-gray-700 ${classNameLabel}`}>
        {label}
      </label>
      <div className="relative w-full">
        {iconInside && (
          <div className="absolute inset-y-0 left-0 pl-3 text-slate-600 flex items-center pointer-events-none">
            {iconInside}
          </div>
        )}
        <input
          type="text"
          className={`${className} ${
            iconInside ? "pl-10" : ""
          } w-full border border-gray-300 transition duration-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
