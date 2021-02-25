import { Card, Typography } from "@material-ui/core";
import CreateNewAdvertisement from "../components/CreateNewAdvertisement";
import Head from "next/head";

const CreateAdvertisementPage = () => {
  return (
    <Card className="flex flex-col items-center">
      <Head>
        <title>Ny reklame | Sellpoint</title>
      </Head>
      <Typography variant="h2">Ny reklame</Typography>
      <CreateNewAdvertisement />
    </Card>
  );
};

export default CreateAdvertisementPage;
