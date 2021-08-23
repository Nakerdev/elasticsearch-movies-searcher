import { AppProps } from "next/app";
import { AppProvider } from "../components/appProvider/index";
import { Header } from "../components/header/index";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Header></Header>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
