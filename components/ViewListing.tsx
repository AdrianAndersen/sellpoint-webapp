import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useContext } from "react";
import { Context } from "./Store";
import GoogleMapsComponent from "../components/GoogleMaps/GoogleMapsComponent";

const useStyles = makeStyles(() => ({
  price: {
    textAlign: "end",
    paddingBottom: "0.5em",
    marginBottom: "0.5em",
    borderBottom: "1px solid #f1f1f1",
  },
}));

const ViewListing = ({ listing }: { listing: any }) => {
  // @ts-ignore
  const [state] = useContext(Context);
  const owner = state.users.find(
    (user: { id: number }) => user.id === listing.owner
  );
  const currentUser = state.users.find(
    (user: { id: number }) => user.id === state.currentUser
  );

  const classes = useStyles();

  return (
    <Grid container direction="row" spacing={3}>
      <Grid item xs={8}>
        <Card>
          <CardMedia image={listing.imageURL} style={{ height: 300 }} />
          <CardContent>
            <Typography className={classes.price} variant="h5">
              {listing.price} kr
            </Typography>

            <Typography variant="h4" gutterBottom>
              {listing.title}
            </Typography>

            <Typography variant="h5" gutterBottom>
              Beskrivelse
            </Typography>

            <Typography variant="body1">{listing.description}</Typography>
          </CardContent>
          <CardActions>
            {listing.categories.map((category: any) => (
              <Chip key={category} label={category} />
            ))}
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Kontakt
            </Typography>

            <Typography variant="h6">Navn:</Typography>
            <Typography gutterBottom>{owner.name}</Typography>

            <Typography variant="h6">Telefonnummer:</Typography>
            <Typography gutterBottom>{owner.phoneNumber}</Typography>
            <Typography variant="h6">Avstand:</Typography>
            <GoogleMapsComponent
              initialMarkers={
                state.currentUser !== undefined
                  ? [currentUser.location, owner.location]
                  : [owner.location]
              }
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ViewListing;
