import AccountCircle from "@material-ui/icons/AccountCircle";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { useGlobalState } from "./GlobalStateProvider";

const NavButtons = () => {
  const { state, dispatch } = useGlobalState();
  const currentUser = state.users.find((user) => user.id === state.currentUser);
  const router = useRouter();
  return (
    <div className="w-full flex flex-row justify-end">
      {currentUser && currentUser.role === "admin" && (
        <Link href="/admin">
          <Button color="inherit">
            <Typography data-cy="navAdminBtn">Admin</Typography>
          </Button>
        </Link>
      )}
      {currentUser && currentUser.role !== "private" && (
        <Link href="/new-ad">
          <Button color="inherit">
            <Typography data-cy="navNewAdBtn">Ny reklame</Typography>
          </Button>
        </Link>
      )}
      {currentUser && currentUser.role !== "business" && (
        <Link href="/new-listing">
          <Button color="inherit">
            <Typography data-cy="navNewListingBtn">Ny annonse</Typography>
          </Button>
        </Link>
      )}
      <Button
        onClick={() => {
          if (currentUser === undefined) {
            router.push("/login");
          } else {
            router.push("/");
            dispatch({ type: "SET_CURRENT_USER", payload: undefined });
          }
        }}
        color="inherit"
      >
        <Typography data-cy="loginBtn">
          {state.currentUser === undefined ? "Logg inn" : "Logg ut"}{" "}
          <AccountCircle />
        </Typography>
      </Button>
    </div>
  );
};

export default NavButtons;
