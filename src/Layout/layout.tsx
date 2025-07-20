import { Header } from "./header";
import { Main } from "./main";
import { Sidebar } from "./sidebar";

export default function LayoutApp({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 h-full">
          <Header />
          <Main>{children}</Main>
        </div>
      </div>
    </div>
  );
}
