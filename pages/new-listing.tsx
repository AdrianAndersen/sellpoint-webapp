import { Card, Typography } from "@material-ui/core";
import CreateListingForm from "../components/Listing/CreateListingForm";
import Head from "next/head";

const CreateListingPage = () => {
  return (
    <Card className="flex flex-col items-center">
      <Head>
        <title>Ny annonse | Sellpoint</title>
      </Head>
      <Typography variant="h2">Ny annonse</Typography>
      <CreateListingForm />
    </Card>
  );
};

export default CreateListingPage;
