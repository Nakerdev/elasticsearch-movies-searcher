import { AppProps } from "next/app";
import { AppProvider } from "../components/appProvider/index";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
      <style jsx global>{`
html,
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
}tml,
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
    </AppProvider>
  );
}

export default MyApp;
