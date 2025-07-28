import LayoutApp from "@/Layout/layout";
import { UploadPdfProvider } from "@/shared/contexts/UploadPdfContext";
import { UserContextProvider } from "@/shared/contexts/UserContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutApp>
      <UserContextProvider>
        <UploadPdfProvider>
          <Component {...pageProps} />
          <ToastContainer pauseOnHover={false} position="bottom-right" />
        </UploadPdfProvider>
      </UserContextProvider>
    </LayoutApp>
  );
}
