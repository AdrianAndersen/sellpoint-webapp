import type { AppProps } from "next/app";
import "../styles/global.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Link from "next/link";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import GitHubIcon from "@material-ui/icons/GitHub";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Sellpoint</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen justify-between bg-gray-100">
        <div>
          <AppBar position="static">
            <Toolbar className="bg-green-600">
              <Link href="/">
                <Button color="inherit">
                  <Typography variant="h5">Sellpoint</Typography>
                </Button>
              </Link>
              <div className="w-full flex flex-row justify-end">
                <Link href="new-ad">
                  <Button color="inherit">
                    <Typography>Ny reklame</Typography>
                  </Button>
                </Link>
                <Link href="new-listing">
                  <Button color="inherit">
                    <Typography>Ny annonse</Typography>
                  </Button>
                </Link>
                <Link href="login">
                  <Button color="inherit">
                    <Typography>
                      Login <AccountCircle />
                    </Typography>
                  </Button>
                </Link>
              </div>
            </Toolbar>
          </AppBar>

          <Container className="mt-5">
            <Component {...pageProps} />
          </Container>
        </div>

        <footer className="w-full bg-green-600 mt-5 pt-5 pb-1">
          <Container className="text-center">
            <Typography>Made by</Typography>
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
    </>
  );
}

export default MyApp;
