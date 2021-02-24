import { useRouter } from "next/router";
import ViewListing from "../../components/ViewListing";

const Listings = () => {
  const router = useRouter();
  const { id } = router.query;
  let listingId = 0;
  if (id instanceof Array) {
    listingId = parseInt(id[0], 10);
  } else {
    listingId = parseInt(id ?? "NaN", 10);
  }

  return <ViewListing index={listingId} />;
};

export default Listings;
