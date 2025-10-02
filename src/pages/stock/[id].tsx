import { FieldsViewMachine } from "@/features/Stock/View/FieldsViewMachine";
import { DialogComponent } from "@/shared/components/dialogs/dialog";
import { useRouter } from "next/router";
import { useState } from "react";

export default function StockId() {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  return (
    <DialogComponent
      open={open}
      onOpenChange={() => router.back()}
      className=""
      textTrigger=""
      textButtonCancel="Cancelar"
      textButtonConfirm="Alterar"
      title="Dados da máquina"
    >
      {/* <FieldsViewMachine loading={false} /> */}
    </DialogComponent>
  );
}
