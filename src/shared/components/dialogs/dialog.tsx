import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { ButtonComponent } from "../ButtonComponent";

interface DialogComponentProps {
  children?: React.ReactNode;
  title?: string;
  classNameTrigger?: string;
  iconTriggerLeft?: React.ReactNode;
  textTrigger?: string;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
  className?: string;
  isDelete?: boolean;
  onClick?: () => void;
}

export function DialogComponent({
  children,
  open,
  onOpenChange,
  title,
  classNameTrigger,
  iconTriggerLeft,
  textTrigger,
  className,
  isDelete,
  onClick
}: DialogComponentProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className={classNameTrigger}>
        {iconTriggerLeft} {textTrigger}
      </DialogTrigger>

      <DialogContent
        className={`bg-slate-50 text-slate-900 sm:max-w-[425px] ${
          isDelete ? "lg:max-w-[425px]" : "lg:max-w-[900px]"
        }`}
      >
        <DialogHeader className="text-slate-900 text-center text-lg font-bold">
          {title}
        </DialogHeader>
        {children}
        <DialogFooter>
          {isDelete && (
            <>
              <ButtonComponent
                text="Cancelar"
                onClick={() => onOpenChange?.(false)}
                className="bg-red-500 rounded-lg text-white hover:bg-red-600"
              />
              <ButtonComponent
                onClick={onClick}
                text="Sim, desejo"
                className="bg-indigo-500 rounded-lg text-white hover:bg-indigo-600"
              />
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
