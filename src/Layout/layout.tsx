import { Header } from "./header";
import { Main } from "./main";

export default function LayoutApp({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full">
      <Header />
      <Main>{children}</Main>
    </div>
  );
}
