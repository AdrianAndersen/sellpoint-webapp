import Link from "next/link";
import NavButtons from "../Layout/NavButtons";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  useMediaQuery,
  makeStyles,
  Drawer,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { createStyles } from "@material-ui/styles";
import { useState } from "react";
import { useGlobalState } from "../StateManagement/GlobalStateProvider";
import { useRouter } from "next/router";
import { AccountCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

const LoginLogout = () => {
  const { state, dispatch } = useGlobalState();
  const currentUser = state.users.find((user) => user.id === state.currentUser);
  const router = useRouter();

  return (
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
  );
};

const NavBar = ({ loading = false }: { loading?: boolean }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Link href="/">
          <Button data-cy="homeBtn" color="inherit">
            <div
              style={{
                width: "300px",
                height: "80px",
                backgroundImage:
                  "url(" + `${require("../../public/logo3.png")}` + ")",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </Button>
        </Link>
        <div style={{ flexGrow: 1 }}></div>
        {!loading && (
          <>
            {isMobile ? (
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <NavButtons
                  isInDrawer={true}
                  onListItemClick={() => setDrawerOpen(false)}
                />
              </Drawer>
            ) : (
              <NavButtons isInDrawer={false} />
            )}
            <LoginLogout />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
