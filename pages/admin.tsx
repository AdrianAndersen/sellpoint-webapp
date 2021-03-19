import { Card, Typography } from "@material-ui/core";
import Head from "next/head";
import CreateNewCategory from "../components/Listing/CreateNewCategory";
import UserManager from "../components/User/UserManager";

const AdminPage = () => {
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
        </div>
      </Card>
    </>
  );
};

export default AdminPage;
