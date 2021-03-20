import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@material-ui/styles";
import Footer from "../Layout/Footer";
import { createMuiTheme } from "@material-ui/core";
import { blue, green } from "@material-ui/core/colors";

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

const PageWrapper = ({
  children,
  usingDB,
}: {
  children: any;
  usingDB: boolean;
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Sellpoint</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen justify-between bg-gray-100">
        <div>{children}</div>

        <Footer usingDB={usingDB} />
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
  );
};

export default PageWrapper;
