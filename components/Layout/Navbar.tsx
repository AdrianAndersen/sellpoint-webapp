import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import NavButtons from "../Layout/NavButtons";

const NavBar = ({ loading = false }: { loading?: boolean }) => {
  return (
    <AppBar position="static">
      <Toolbar>
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
        {!loading && <NavButtons />}
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
