import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { ButtonComponent } from "../ButtonComponent";
import { LuSend } from "react-icons/lu";
import { ClipLoader } from "react-spinners";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface PopoverComponentProps {
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
  onTriggerClick?: (e: any) => void;
  textButtonConfirm?: string;
  textButtonCancel?: string;
  loadingShowButton?: boolean;
  loadingFallbackButton?: boolean;
  iconButton?: React.ReactNode;
  iconLeftButton?: React.ReactNode;
  iconRightButton?: React.ReactNode;
}

export function PopoverComponent({
  children,
  open,
  onOpenChange,
  classNameTrigger,
  iconTriggerLeft,
  textTrigger,
  onTriggerClick,
  onClick,
}: PopoverComponentProps) {
  async function handleConfirm() {
    const result: any = await onClick?.();
    if (result?.success) {
      onOpenChange?.(false);
    }
  }
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger onClick={onTriggerClick} className={classNameTrigger}>
        {iconTriggerLeft} {textTrigger}
      </PopoverTrigger>

      <PopoverContent
        className={`bg-slate-50 text-slate-700`}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
