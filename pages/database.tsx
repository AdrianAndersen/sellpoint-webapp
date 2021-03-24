import { Button, Card, Typography } from "@material-ui/core";
import { demoData, testData } from "../lib/fixtures";
import { info, success } from "../lib/toasts";
import Head from "next/head";
import { GlobalState } from "../lib/Types";
import {
  useGlobalState,
  emptyState,
} from "../components/StateManagement/GlobalStateProvider";
import { useRouter } from "next/router";
import { addAllDB } from "../lib/requests";

const DatabaseManager = () => {
  const { state, dispatch } = useGlobalState();
  const router = useRouter();

  if (!state.usingDB)
    return (
      <Typography data-cy="databaseHeader" className="text-center" variant="h2">
        Du må være koblet til databasen for å bruke database-verktøyet
      </Typography>
    );

  const emptyDB = async () => {
    info("Tømmer databasen. Vennligst vent...");
    await fetch("/api/reset_db");
    success("Databasen ble tømt!");
    dispatch({ type: "SET_STATE", payload: emptyState });
    router.push("/");
  };

  const loadData = async (data: GlobalState) => {
    await addAllDB(data);
    success("Databasen ble oppdatert!");
    dispatch({ type: "SET_STATE", payload: { ...data, usingDB: true } });
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>Databaseverktøy | Sellpoint</title>
      </Head>
      <Card className="flex flex-wrap justify-center">
        <Typography className="w-full text-center" variant="h3">
          Databaseverktøy
        </Typography>
        <Button className="w-full" onClick={() => emptyDB()}>
          Tøm Database
        </Button>
        <Button
          data-cy="loadTestData"
          onClick={() => {
            info("Laster inn test-data. Vennligst vent...");
            loadData(testData);
          }}
        >
          Last inn test-data
        </Button>
        <Button
          onClick={() => {
            info("Laster inn demo-data. Vennligst vent...");
            loadData(demoData);
          }}
        >
          Last inn demo-data
        </Button>
      </Card>
    </>
  );
};

export default DatabaseManager;
