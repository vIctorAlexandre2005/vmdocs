import { useAuth } from "@/features/Auth/modelView/useAuth";
import { ButtonComponent } from "@/shared/components/ButtonComponent";
import { PopoverComponent } from "@/shared/components/dialogs/popover";
import { useUserContext } from "@/shared/contexts/UserContext";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";

export function Header() {
  const { user } = useUserContext();
  const { handleLogout } = useAuth();
  const [openPopoverConfig, setOpenPopoverConfig] = useState(false);
  return (
    <div className="border-b w-full p-4 flex justify-between items-center bg-slate-50">
      <div className="flex gap-2 items-center">
        <h1 className="font-bold text-xl text-slate-800  border-gray-200">
          Bem-vindo,
        </h1>
        <h1 className="font-bold text-xl text-indigo-500  border-gray-200">
          {user?.userName} 👋
        </h1>
      </div>
        <PopoverComponent
          open={openPopoverConfig}
          onOpenChange={setOpenPopoverConfig}
          textTrigger="Configurações"
          classNameTrigger="flex items-center gap-2 cursor-pointer hover:text-slate-800 text-slate-800 transition duration-300"
          iconTriggerLeft={<IoSettingsOutline size={24} />}
        >
          <ButtonComponent
            iconLeft={<TbLogout2 size={24} />}
            text="Sair"
            className="hover:text-red-500"
            onClick={handleLogout}
          />
        </PopoverComponent>
      </div>
  );
}
