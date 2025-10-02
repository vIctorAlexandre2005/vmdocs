import { LuSearchX } from "react-icons/lu";

interface InputComponentProps {
  label: string;
  placeholder?: string;
  value?: string;
  classNameLabel?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  iconInside?: React.ReactNode;
  type?: string;
  data_cy_test?: string;
  disabled?: boolean;
  readonly?: boolean;
}

export function InputComponent({
  label,
  placeholder,
  value,
  onChange,
  className,
  iconInside,
  classNameLabel,
  type,
  data_cy_test,
  disabled,
  readonly,
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
          type={type ? type : "text"}
          className={`${className} ${
            iconInside ? "pl-10" : ""
          } w-full border border-gray-300 ${
            disabled && "cursor-not-allowed"
          } transition duration-300 rounded-2xl focus:outline-none p-2 focus:ring-2 focus:ring-indigo-500`}
          placeholder={placeholder}
          value={value}
          data-cy={data_cy_test}
          disabled={disabled}
          readOnly={readonly}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
