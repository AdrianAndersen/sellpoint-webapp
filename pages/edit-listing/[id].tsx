import { Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import CreateListingForm from "../../components/CreateListingForm";
import Head from "next/head";
import { useGlobalState } from "../../components/GlobalStateProvider";

const EditListingPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { state } = useGlobalState();
  const listing = state.listings.find((listing) => listing.id === id);
  return (
    <div className="min-h-screen flex flex-col items-center">
      {listing && listing.title && (
        <Head>
          <title>{listing.title} | Sellpoint</title>
        </Head>
      )}
      <Typography variant="h2">Endre annonse</Typography>
      <CreateListingForm initialListing={listing} />
    </div>
  );
};

export default EditListingPage;
