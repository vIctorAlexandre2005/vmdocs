import { useRouter } from "next/router";
import { Header } from "./header";
import { Main } from "./main";
import { Sidebar } from "./sidebar";
import { useUserContext } from "@/shared/contexts/UserContext";
import { useEffect } from "react";

export default function LayoutApp({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user?.trim() !== "") {
        setUser(JSON.parse(user || ""));
      } else {
        router.push("/auth/login");
      }
    }
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="flex h-full">
        {!["/auth/login", "/auth/register"].includes(router.pathname) && (
          <Sidebar />
        )}
        <div className="flex-1 h-full">
          {!["/auth/login", "/auth/register"].includes(router.pathname) && (
            <Header />
          )}
          <Main>{children}</Main>
        </div>
      </div>
    </div>
  );
}
