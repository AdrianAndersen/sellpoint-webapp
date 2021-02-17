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
      <div className="flex flex-col h-screen justify-between">
        <AppBar position="static">
          <Toolbar className="bg-blue-600">
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
        <Container className="h-full mt-2">
          <Component {...pageProps} />
        </Container>
        <footer className="w-full bg-blue-600 pt-5 pb-1">
          <Container className="text-center">
            <Typography>Made by</Typography>
            <div>
              <Link href="https://github.com/AdrianAndersen">
                <Button>Adrian Andersen</Button>
              </Link>
              <Link href="">
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
