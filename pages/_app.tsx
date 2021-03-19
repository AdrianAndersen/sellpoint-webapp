import type { AppProps } from "next/app";
import "../styles/global.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import NavButtons from "../components/Layout/NavButtons";
import useSWR from "swr";
import GlobalStateProvider from "../components/StateManagement/GlobalStateProvider";
import StateSWR from "../components/Layout/StateSWR";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { blue, green } from "@material-ui/core/colors";
import Footer from "../components/Layout/Footer";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const theme = createMuiTheme({
  palette: {
    primary: {
      light: green[400],
      main: green[700],
      dark: green[800],
    },
    secondary: {
      light: blue.A200,
      main: blue.A400,
      dark: blue.A700,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const { data, error } = useSWR("/api/all", fetcher);

  if (error) return <StateSWR error={true} />;
  if (!data) return <StateSWR />;

  return (
    <GlobalStateProvider initialState={data}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Sellpoint</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex flex-col min-h-screen justify-between bg-gray-100">
          <div>
            <AppBar position="static">
              <Toolbar>
                <Link href="/">
                  <Button data-cy="homeBtn" color="inherit">
                    <div
                      style={{
                        width: "300px",
                        height: "80px",
                        backgroundImage:
                          "url(" + `${require("../public/logo3.png")}` + ")",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </Button>
                </Link>
                <NavButtons />
              </Toolbar>
            </AppBar>
            <Container className="mt-5">
              <Component {...pageProps} />
            </Container>
          </div>

          <Footer data={data} />
        </div>
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </GlobalStateProvider>
  );
}

export default MyApp;
