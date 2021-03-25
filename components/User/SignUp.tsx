import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "next/link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useState } from "react";
import GoogleMapsComponent from "../GoogleMaps/GoogleMapsComponent";
import validateUser from "../Validators/UserValidator";
import { User, UserRole } from "../../lib/Types";
import { useGlobalState } from "../StateManagement/GlobalStateProvider";
import { error } from "../../lib/toasts";
import { addUserDB, updateUserDB } from "../../lib/requests";

const useStyles = makeStyles((theme) => ({
  image: {
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

export default function SignUp({
  role,
  initialUser,
}: {
  role: UserRole;
  initialUser?: User;
}) {
  const classes = useStyles();
  const router = useRouter();
  const [user, setUser] = useState<Partial<User>>(initialUser || {});
  const { state, dispatch } = useGlobalState();
  return (
    <Grid container component="main">
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        className={classes.image}
        style={
          role === "private"
            ? {
                backgroundImage:
                  "url(https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
              }
            : {
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
              }
        }
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {initialUser ? "Endre " : "Ny "}
            {role === "private" ? "privatkonto" : "bedriftskonto"}
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  defaultValue={initialUser?.name}
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label={role === "private" ? "Navn" : "Bedriftsnavn"}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  defaultValue={initialUser?.phoneNumber}
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNumber"
                  label={role === "private" ? "Telefon" : "Bedriftstelefon"}
                  name="phoneNumber"
                  autoComplete="phone"
                  onChange={(e) =>
                    setUser({ ...user, phoneNumber: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  defaultValue={initialUser?.username}
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
                  defaultValue={initialUser?.password}
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
                <GoogleMapsComponent
                  initialMarkers={
                    initialUser ? [initialUser.location] : undefined
                  }
                  user={user}
                  setUser={setUser}
                />
              </Grid>
            </Grid>
            <Button
              data-cy="signUpSubmit"
              onClick={async (e) => {
                e.preventDefault();
                const userWithRole = { ...user, role: role, ratings: [] };
                if (validateUser(userWithRole)) {
                  if (initialUser) {
                    dispatch({
                      type: "REMOVE_USER",
                      payload: initialUser.id,
                    });
                  }
                  if (state.usingDB) {
                    let response;
                    if (initialUser) {
                      response = await updateUserDB(userWithRole);
                    } else {
                      response = await addUserDB(userWithRole);
                    }

                    if (response) {
                      dispatch({
                        type: "ADD_USER",
                        payload: { id: response.id, ...userWithRole },
                      });
                      router.push("/");
                    }
                  } else {
                    dispatch({
                      type: "ADD_USER",
                      payload: {
                        id: Math.floor(Math.random() * Math.floor(10000000)),
                        ...userWithRole,
                      },
                    });
                    router.push("/");
                  }
                } else error("Du må fylle ut alle feltene!");
              }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {initialUser ? "Oppdater konto" : "Registrer deg"}
            </Button>
            {!initialUser && (
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login">Har du allerede en konto? Logg inn</Link>
                </Grid>
              </Grid>
            )}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
