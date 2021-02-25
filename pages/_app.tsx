import type { AppProps } from "next/app";
import "../styles/global.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import GitHubIcon from "@material-ui/icons/GitHub";
import Store from "../components/Store";
import NavButtons from "../components/NavButtons";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Store>
      <Head>
        <title>Sellpoint</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen justify-between bg-gray-100">
        <div>
          <AppBar position="static">
            <Toolbar className="bg-green-800">
              <Link href="/">
                <Button color="inherit">
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

        <footer className="w-full bg-green-600 mt-5 pt-5 pb-1">
          <Container className="text-center">
            <Typography>Laget av</Typography>
            <div>
              <Link href="https://github.com/AdrianAndersen">
                <Button>Adrian Andersen</Button>
              </Link>
              <Link href="https://github.com/amatho">
                <Button>Amandus Søve Thorsrud</Button>
              </Link>
              <Link href="">
                <Button>Arash Aminpour</Button>
              </Link>
              <Link href="">
                <Button>Jacob Alexander Almnes</Button>
              </Link>
              <Link href="">
                <Button>Therese Sigmundstad</Button>
              </Link>
              <Link href="">
                <Button>Øyvind Holm Håheim</Button>
              </Link>
            </div>
            <Link href="https://github.com/AdrianAndersen/sellpoint-webapp">
              <Button>
                Github
                <GitHubIcon className="ml-1" />
              </Button>
            </Link>
          </Container>
        </footer>
      </div>
    </Store>
  );
}

export default MyApp;
