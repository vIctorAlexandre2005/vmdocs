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
  onTriggerClick?: (e: any) => void;
  textButtonConfirm?: string;
  textButtonCancel?: string;
  loadingShowButton?: boolean;
  loadingFallbackButton?: boolean;
  iconButton?: React.ReactNode;
  iconLeftButton?: React.ReactNode;
  iconRightButton?: React.ReactNode;
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
  onTriggerClick,
  isDelete,
  onClick,
  textButtonCancel,
  textButtonConfirm,
  loadingShowButton,
  loadingFallbackButton,
  iconButton,
  iconLeftButton,
  iconRightButton,
}: DialogComponentProps) {
  async function handleConfirm() {
    const result: any = await onClick?.();
    if (result?.success) {
      onOpenChange?.(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger onClick={onTriggerClick} className={classNameTrigger}>
        {iconTriggerLeft} {textTrigger}
      </DialogTrigger>

      <DialogContent
        className={`bg-slate-50 text-slate-900 ${
          isDelete ? "lg:max-w-[425px]" : "max-sm:max-w-full sm:max-h-[calc(100vh-120px)] sm:max-w-11/12 overflow-auto"
        }`}
      >
        <DialogHeader className="text-slate-900 text-center text-lg font-bold">
          {title}
        </DialogHeader>
        {children}
        <DialogFooter>
          {!loadingShowButton && (
            <>
              <ButtonComponent
                text={textButtonCancel}
                onClick={() => onOpenChange?.(false)}
                className="bg-red-500 rounded-lg text-white hover:bg-red-600"
              />
              <ButtonComponent
                onClick={handleConfirm}
                text={textButtonConfirm}
                type="submit"
                loading={loadingFallbackButton}
                disabled={loadingFallbackButton}
                className="items-baseline text-base font-bold transition duration-300 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                icon={iconButton}
                iconLeft={iconLeftButton}
                iconRight={iconRightButton}
                loaderIcon={<ClipLoader size={20} color="#fff" />}
              />
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
