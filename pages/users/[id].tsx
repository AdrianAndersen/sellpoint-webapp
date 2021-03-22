import { useRouter } from "next/router";
import ProfilePage from "../../components/User/ProfilePage";
import { useGlobalState } from "../../components/StateManagement/GlobalStateProvider";
import Head from "next/head";
import { error } from "../../lib/toasts";

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const { state } = useGlobalState();
  const user = state.users.find((user) => user.id === Number(id));
  if (!user) {
    error("Kunne ikke finne bruker.");
    return <p></p>;
  }
  return (
    <>
      <Head>
        <title>{user.name} | Sellpoint</title>
      </Head>
      <ProfilePage user={user} />
    </>
  );
};

export default User;
