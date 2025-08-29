import { useUserContext } from "@/shared/contexts/UserContext";
import { Header } from "./header";
import { Main } from "./main";
import { Sidebar } from "./sidebar";
import { Loader } from "@/shared/components/Loader";
import { PuffLoader } from "react-spinners";
import { useRouter } from "next/router";

export default function LayoutApp({ children }: { children: React.ReactNode }) {
  const { loading, user } = useUserContext();
  const router = useRouter();
  const pageAuth = ["/auth/login", "/auth/register"].includes(router.pathname);

  if (loading) {
    return (
      <div className="top-1/2 left-1/2 absolute translate-x-[-50%] translate-y-[-50%]">
        <Loader loaderIcon={<PuffLoader size={100} color="#3b82f6" />} />
      </div>
    );
  }

  if (
    !user &&
    !pageAuth
  ) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="flex h-full">
        {!pageAuth && <Sidebar />}
        <div className="flex-1 w-full h-full">
          <div className="w-full">
            {!pageAuth && <Header />}
          </div>
          <Main>{children}</Main>
        </div>
      </div>
    </div>
  );
}
