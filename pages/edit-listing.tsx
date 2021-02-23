import { Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import useSWR from "swr";
import CreateListingForm from "../components/CreateListingForm";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const EditListingPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const listingId = parseInt(id instanceof Array ? id[0] : id ?? "NaN", 10);
  const { data, error } = useSWR(id ? "/api/listings" : null, fetcher);

  if (error) return <div>Failed to load listings</div>;
  if (!data) return <div>Loading...</div>;

  const listing = data[listingId];
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Typography variant="h2">Endre annonse</Typography>
      <CreateListingForm initialListing={listing} />
    </div>
  );
};

export default EditListingPage;
