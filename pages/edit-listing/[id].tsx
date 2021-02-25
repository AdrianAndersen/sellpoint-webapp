import { Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import CreateListingForm from "../../components/CreateListingForm";
import { useContext } from "react";
import { Context } from "../../components/Store";
import Head from "next/head";

const EditListingPage = () => {
  const router = useRouter();
  const { id } = router.query;
  // @ts-ignore
  const [state] = useContext(Context);
  const listing = state.listings.find(
    (listing: { id: number }) => listing.id === Number(id)
  );
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Head>
        <title>{listing.title} | Sellpoint</title>
      </Head>
      <Typography variant="h2">Endre annonse</Typography>
      <CreateListingForm initialListing={listing} />
    </div>
  );
};

export default EditListingPage;
