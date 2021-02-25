import { useRouter } from "next/router";
import ViewListing from "../../components/ViewListing";
import { useContext } from "react";
import { Context } from "../../components/Store";
import Head from "next/head";

const Listings = () => {
  const router = useRouter();
  const { id } = router.query;

  // @ts-ignore
  const [state] = useContext(Context);
  const listing = state.listings.find(
    (listing: { id: number }) => listing.id === Number(id)
  );
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
