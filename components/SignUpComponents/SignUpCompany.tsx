import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useState } from "react";
import GoogleMapsComponent from "../GoogleMaps/GoogleMapsComponent";
import validateUser from "./UserValidator";
import { User } from "../Types";
import { useGlobalState } from "../GlobalStateProvider";

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpCompany() {
  const classes = useStyles();
  const router = useRouter();
  const [user, setUser] = useState<Partial<User>>({ role: "business" });
  const { dispatch } = useGlobalState();

  return (
    <Grid container component="main">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ny bedriftskonto
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="companyName"
                  variant="outlined"
                  required
                  fullWidth
                  id="companyName"
                  label="Bedriftsnavn"
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Bedriftstelefon"
                  name="phone"
                  autoComplete="phone"
                  onChange={(e) =>
                    setUser({ ...user, phoneNumber: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Brukernavn"
                  name="username"
                  autoComplete="uname"
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Passord"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <GoogleMapsComponent user={user} setUser={setUser} />
              </Grid>
            </Grid>
            <Button
              data-cy="signUpBusinessSubmit"
              onClick={async (e) => {
                e.preventDefault();
                if (validateUser(user)) {
                  if (process.env.DATABASE_URL) {
                    const response = await fetch("/api/users", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(user),
                    }).then((response) => response.json());
                    if (response) {
                      dispatch({
                        type: "ADD_USER",
                        payload: { id: response.id, ...user },
                      });
                      router.push("/");
                    }
                  } else {
                    dispatch({
                      type: "ADD_USER",
                      payload: {
                        id: Math.floor(Math.random() * Math.floor(10000000)),
                        ...user,
                      },
                    });
                    router.push("/");
                  }
                } else alert("Du må fylle ut alle feltene!");
              }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registrer deg
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Har du allerede en konto? Logg inn
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
