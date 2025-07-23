import LayoutApp from "@/Layout/layout";
import { UploadPdfProvider } from "@/shared/contexts/UploadPdfContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutApp>
      <UploadPdfProvider>
        <Component {...pageProps} />
      </UploadPdfProvider>
    </LayoutApp>
  );
}
