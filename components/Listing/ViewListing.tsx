import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import Link from "next/link";
import { useGlobalState } from "../StateManagement/GlobalStateProvider";
import GoogleMapsComponent from "../GoogleMaps/GoogleMapsComponent";
import { Listing } from "../../lib/Types";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles(() => ({
  price: {
    textAlign: "end",
    paddingBottom: "0.5em",
    marginBottom: "0.5em",
    borderBottom: "1px solid #f1f1f1",
  },
}));

const ViewListing = ({ listing }: { listing: Listing }) => {
  const { state } = useGlobalState();
  const owner = state.users.find((user) => user.id === listing.owner);
  const currentUser = state.users.find((user) => user.id === state.currentUser);

  const classes = useStyles();

  return (
    <Grid container direction={isMobile ? "column" : "row"} spacing={3}>
      <Grid item xs={isMobile ? 12 : 8}>
        <Card>
          <CardMedia image={listing.imageURL} style={{ height: 300 }} />
          <CardContent>
            <Typography data-cy="price" className={classes.price} variant="h5">
              {listing.price} kr
            </Typography>

            <Typography data-cy="title" variant="h4" gutterBottom>
              {listing.title}
            </Typography>

            <Typography variant="h5" gutterBottom>
              Beskrivelse
            </Typography>

            <Typography variant="body1">{listing.description}</Typography>
          </CardContent>
          <CardActions>
            {listing.categories.map((category) => (
              <Chip key={category} label={category} />
            ))}
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={isMobile ? 12 : 4}>
        <Card>
          <CardContent>
            <div className="flex justify-between">
              <Typography variant="h5" gutterBottom>
                Kontakt
              </Typography>

              <Link href={"/users/" + listing.owner}>
                <Button
                  variant="contained"
                  color="primary"
                  data-cy="viewProfile"
                >
                  Se profil
                </Button>
              </Link>
            </div>

            <Typography variant="h6">Navn:</Typography>
            <Typography data-cy="ownerName" gutterBottom>
              {owner && owner.name}
            </Typography>

            <Typography variant="h6">Telefonnummer:</Typography>
            <Typography data-cy="ownerPhone" gutterBottom>
              {owner && owner.phoneNumber}
            </Typography>
            <Typography variant="h6">Avstand:</Typography>
            <GoogleMapsComponent
              initialMarkers={
                currentUser && owner
                  ? [currentUser.location, owner.location]
                  : owner
                  ? [owner.location]
                  : []
              }
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ViewListing;
