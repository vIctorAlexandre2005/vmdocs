import { useRouter } from "next/router";
import { Header } from "./header";
import { Main } from "./main";
import { Sidebar } from "./sidebar";
import { useUserContext } from "@/shared/contexts/UserContext";
import { useEffect } from "react";
import { useAuth } from "@/features/Auth/modelView/useAuth";
import { Loader } from "@/shared/components/Loader";
import { PulseLoader, SyncLoader } from "react-spinners";
import { errorToast } from "@/shared/utils/toasts";

export default function LayoutApp({ children }: { children: React.ReactNode }) {
  const { user, setUser, setToken, token, loadUser } = useUserContext();
  //const { getUserMe } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setToken(token);
    } else if (!["/auth/login", "/auth/register"].includes(router.pathname)) {
      // só redireciona se não estiver em uma rota pública
      router.push("/auth/login");
    }
  }, []);

  /* useEffect(() => {
    if (token) {
      getUserMe();
    }
  }, [token]); */

  const pageAuth = !["/auth/login", "/auth/register"].includes(router.pathname);

  /* if (loadUser) {
    return (
      <div className="top-1/2 left-1/2 fixed transform flex flex-col gap-12 -translate-x-1/2 -translate-y-1/2">
        <PulseLoader size={16} color="#4636f5" />
      </div>
    );
  } */

  // se a rota for de login/register, mostra o conteúdo normalmente
  if (!pageAuth) {
    return <>{children}</>;
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="flex h-full">
        {pageAuth && <Sidebar />}
        <div className="flex-1 h-full">
          {pageAuth && <Header />}
          <Main>{children}</Main>
        </div>
      </div>
    </div>
  );
}
