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
  onOpenChange?: () => void;
}

export function DialogComponent({
  children,
  open,
  onOpenChange,
  title,
  classNameTrigger,
  iconTrigger,
  textTrigger,
}: DialogComponentProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className={classNameTrigger}>
        {textTrigger} {iconTrigger}
      </DialogTrigger>

      <DialogContent className="bg-slate-50 text-slate-900">
        <DialogHeader>{title}</DialogHeader>
        {children}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
