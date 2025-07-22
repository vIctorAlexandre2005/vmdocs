type ButtonComponentProps = {
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  loaderIcon?: React.ReactNode;
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
}: ButtonComponentProps) {
  return (
    <button
      type="button"
      disabled={loading ? disabled : false}
      className={`p-2 cursor-pointer flex items-center justify-center ${className}`}
    >
      {!loading && (
        <span className="flex items-center gap-2">
          {text}
          {icon}
        </span>
      )}
      {loading && <span className="flex items-center justify-center">{loaderIcon}</span>}
    </button>
  );
}
