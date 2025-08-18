import { useUserContext } from "@/shared/contexts/UserContext";

export function Header() {
  const { user } = useUserContext();
  return (
    <div className="border-b p-2 font-bold text-2xl text-slate-800 bg-slate-50 border-gray-200">
      Bem-vindo ao VMDocs, {user?.userName}
    </div>
  );
}
