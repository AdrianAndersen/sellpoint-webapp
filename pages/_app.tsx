import type { AppProps } from "next/app";
import "../styles/global.css";
import Container from "@material-ui/core/Container";
import useSWR from "swr";
import GlobalStateProvider from "../components/StateManagement/GlobalStateProvider";
import StateSWR from "../components/Layout/StateSWR";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/Layout/Navbar";
import PageWrapper from "../components/Layout/PageWrapper";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function MyApp({ Component, pageProps }: AppProps) {
  const { data, error } = useSWR("/api/all", fetcher);

  if (error) return <StateSWR error={true} />;
  if (!data) return <StateSWR />;

  return (
    <PageWrapper usingDB={data.usingDB || false}>
      <GlobalStateProvider initialState={data}>
        <NavBar />
        <Container className="mt-5">
          <Component {...pageProps} />
        </Container>
      </GlobalStateProvider>
    </PageWrapper>
  );
}

export default MyApp;
