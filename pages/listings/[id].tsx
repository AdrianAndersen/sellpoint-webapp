import { useRouter } from "next/router";
import ViewListing from "../../components/Listing/ViewListing";
import { useGlobalState } from "../../components/StateManagement/GlobalStateProvider";
import Head from "next/head";

const Listings = () => {
  const router = useRouter();
  const { id } = router.query;
  const { state } = useGlobalState();
  const listing = state.listings.find((listing) => listing.id === Number(id));
  if (!listing) {
    return <p></p>;
  }
  return (
    <>
      <Head>
        <title>{listing.title} | Sellpoint</title>
      </Head>
      <ViewListing listing={listing} />
    </>
  );
};

export default Listings;
