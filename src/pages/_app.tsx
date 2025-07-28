import LayoutApp from "@/Layout/layout";
import { UploadPdfProvider } from "@/shared/contexts/UploadPdfContext";
import { UserContextProvider } from "@/shared/contexts/UserContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutApp>
      <UserContextProvider>
        <UploadPdfProvider>
          <Component {...pageProps} />
        </UploadPdfProvider>
      </UserContextProvider>
    </LayoutApp>
  );
}
