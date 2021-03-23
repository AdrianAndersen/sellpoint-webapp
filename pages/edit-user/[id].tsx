import { Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useGlobalState } from "../../components/StateManagement/GlobalStateProvider";
import SignUp from "../../components/User/SignUp";

const EditListingPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { state } = useGlobalState();
  const user = state.users.find((user) => user.id === Number(id));
  return (
    <div className="min-h-screen flex flex-col items-center">
      {user && (
        <>
          <Head>
            <title>{user.name} | Sellpoint</title>
          </Head>
          <Typography variant="h2">Endre bruker</Typography>
          <SignUp role={user.role} initialUser={user} />
        </>
      )}
    </div>
  );
};

export default EditListingPage;
