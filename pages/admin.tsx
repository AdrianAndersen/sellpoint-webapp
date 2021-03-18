import { Button, Card, Typography } from "@material-ui/core";
import Head from "next/head";
import CreateNewCategory from "../components/Listing/CreateNewCategory";
import { useGlobalState } from "../components/StateManagement/GlobalStateProvider";
import UserManager from "../components/User/UserManager";
import populateDB, { emptyDB } from "../lib/databaseUtil";
import { demoData, testData } from "../lib/fixtures";

const AdminPage = () => {
  const { state } = useGlobalState();
  return (
    <>
      <Head>
        <title>Admin-side | Sellpoint</title>
      </Head>
      <Card className="flex flex-col items-center">
        <Typography variant="h2" gutterBottom>
          Admin-side
        </Typography>
        <div className="p-4">
          <UserManager />
          <CreateNewCategory />
          {state.usingDB && (
            <>
              <Button
                onClick={() => {
                  emptyDB();
                }}
              >
                Tøm databasen
              </Button>
              <Button
                onClick={() => {
                  populateDB(testData);
                }}
              >
                Last inn test-data
              </Button>
              <Button
                onClick={() => {
                  populateDB(demoData);
                }}
              >
                Last inn demo-data
              </Button>
            </>
          )}
        </div>
      </Card>
    </>
  );
};

export default AdminPage;
