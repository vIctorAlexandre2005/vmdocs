type ButtonComponentProps = {
  text?: string;
  icon?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  loaderIcon?: React.ReactNode;
  data_cy_button?: string;
};

export function ButtonComponent({
  text,
  icon,
  className,
  disabled,
  loaderIcon,
  loading,
  onClick,
  type,
  iconLeft,
  iconRight,
  data_cy_button
}: ButtonComponentProps) {
  return (
    <button
      type="button"
      data-cy={data_cy_button}
      disabled={loading ? disabled : false}
      className={`p-2 cursor-pointer flex items-center ${disabled && "opacity-50"} justify-center ${className}`}
      onClick={onClick}
    >
      {!loading && (
        <span className="flex items-center gap-2">
          {iconLeft}
          {text}
          {iconRight}
          {icon}
        </span>
      )}
      {loading && (
        <span className="flex items-center justify-center">{loaderIcon}</span>
      )}
    </button>
  );
}
