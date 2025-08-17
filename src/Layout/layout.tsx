import { useRouter } from "next/router";
import { Header } from "./header";
import { Main } from "./main";
import { Sidebar } from "./sidebar";
import { useUserContext } from "@/shared/contexts/UserContext";
import { useEffect } from "react";

export default function LayoutApp({ children }: { children: React.ReactNode }) {
  const { user, setUser, setToken } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setToken(token);
    }
  }, []);

  const pageAuth = !["/auth/login", "/auth/register"].includes(
    router.pathname
  );

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
