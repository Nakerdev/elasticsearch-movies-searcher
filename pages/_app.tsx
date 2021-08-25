import { AppProps } from "next/app";
import { AppProvider } from "../components/appProvider/index";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
