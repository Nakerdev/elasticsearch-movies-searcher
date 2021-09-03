import { AppProps } from "next/app";
import { AppProvider } from "../components/appProvider/index";
import { colors } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
      <style jsx global>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          padding: 0;
          margin: 0;
          height: 100%;
          background-color: ${colors.primary};
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        h1 {
          margin: 0;
        }

        * {
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }
        tml,
        body {
          padding: 0;
          margin: 0;
          height: 100%;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        h1 {
          margin: 0;
        }

        * {
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }
      `}</style>
    </>
  );
}

export default MyApp;
