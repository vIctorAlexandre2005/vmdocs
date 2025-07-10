import LayoutApp from "@/Layout/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutApp>
      <Component {...pageProps} />
    </LayoutApp>
  );
}
