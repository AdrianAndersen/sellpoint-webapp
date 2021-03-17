import { Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import CreateNewAdvertisement from "../../components/CreateNewAdvertisement";
import Head from "next/head";
import { useGlobalState } from "../../components/GlobalStateProvider";

const EditAdvertisementPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { state } = useGlobalState();
  const advertisement = state.advertisements.find(
    (advertisement) => advertisement.id === Number(id)
  );
  return (
    <div className="min-h-screen flex flex-col items-center">
      {advertisement && advertisement.title && (
        <Head>
          <title>{advertisement.title} | Sellpoint</title>
        </Head>
      )}
      <Typography variant="h2">Endre annonse</Typography>
      <CreateNewAdvertisement initialAdvertisement={advertisement} />
    </div>
  );
};

export default EditAdvertisementPage;
