import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

interface DialogComponentProps {
  children?: React.ReactNode;
  title?: string;
  classNameTrigger?: string;
  iconTrigger?: React.ReactNode;
  textTrigger?: string;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export function DialogComponent({
  children,
  open,
  onOpenChange,
  title,
  classNameTrigger,
  iconTrigger,
  textTrigger,
  className
}: DialogComponentProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className={classNameTrigger}>
        {textTrigger} {iconTrigger}
      </DialogTrigger>

      <DialogContent className={`bg-slate-50 text-slate-900 sm:max-w-[425px] lg:max-w-[900px]`}>
        <DialogHeader>{title}</DialogHeader>
        {children}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
