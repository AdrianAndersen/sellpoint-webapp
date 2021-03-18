import {
  Avatar,
  Button,
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import Link from "next/link";
import { useReducer } from "react";
import { useGlobalState } from "../StateManagement/GlobalStateProvider";
import moment from "moment";
import { getPrettyDistance } from "../GoogleMaps/GoogleMapsComponent";
import { Category, Listing } from "../../lib/Types";
import SortComponent from "./SortComponent";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(1),
    width: 275,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  sold: {
    opacity: 0.5,
  },
  actionWrapper: {
    display: "flex",
    flex: "wrap",
  },
}));

const ListingOverview = ({ categories }: { categories: Category[] }) => {
  const classes = useStyles();
  const { state, dispatch } = useGlobalState();
  const currentUser = state.users.find((user) => user.id === state.currentUser);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleSold = async (e: any, listing: Listing) => {
    listing.sold = e.target.checked ? true : false;
    dispatch({
      type: "SET_LISTINGS",
      payload: state.listings,
    });
    if (state.usingDB) {
      await fetch("/api/listings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: listing.id, sold: listing.sold }),
      });
    }
  };

  return (
    <>
      <SortComponent />
      <Grid
        data-cy="listingOverview"
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        {state.listings
          .filter(
            (listing) =>
              categories.length == 0 ||
              listing.categories.some((category) =>
                categories.includes(category)
              )
          )
          .map((listing) => (
            <Card
              className={`${classes.card} ${listing.sold ? classes.sold : ""}`}
              key={listing.id}
            >
              <CardHeader
                data-cy="listingTitle"
                avatar={<Avatar></Avatar>}
                title={listing.title + (listing.sold ? " SOLGT" : "")}
                subheader={moment().format("DD/MM/YYYY")}
              />
              <CardMedia className={classes.media} image={listing.imageURL} />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="button"
                  component="h2"
                  data-cy="priceOverview"
                >
                  {listing.price} kr
                </Typography>
                <Typography
                  gutterBottom
                  variant="button"
                  component="h2"
                  data-cy="distanceOverview"
                >
                  Avstand:{" "}
                  {currentUser &&
                    state.users.find((user) => user.id === listing.owner) &&
                    getPrettyDistance(
                      currentUser.location,
                      // @ts-ignore
                      state.users.find((user) => user.id === listing.owner)
                        .location
                    )}
                  {!currentUser && <>Du må logge inn for å se avstand!</>}
                </Typography>
                <Typography variant="body1">
                  {listing.description.substr(0, 50) + "..."}
                </Typography>
              </CardContent>
              <CardActions className="flex flex-wrap">
                <Link href={"/listings/" + listing.id}>
                  <Button data-cy="viewListing">Se mer</Button>
                </Link>
                {currentUser &&
                  (currentUser.role === "admin" ||
                    currentUser.id === listing.owner) && (
                    <>
                      <Link href={"/edit-listing/" + listing.id}>
                        <IconButton color="secondary">
                          <Edit />
                        </IconButton>
                      </Link>
                      <IconButton
                        data-cy="deleteListing"
                        color="secondary"
                        onClick={async () => {
                          let response;
                          if (state.usingDB) {
                            response = await fetch("/api/listings", {
                              method: "DELETE",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ id: listing.id }),
                            }).then((response) => response.json());
                          }
                          if (response || !state.usingDB) {
                            dispatch({
                              type: "REMOVE_LISTING",
                              payload: listing.id,
                            });
                          }
                          forceUpdate();
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </>
                  )}
                {currentUser &&
                  (currentUser.id === listing.owner ||
                    currentUser.role == "admin") && (
                    <FormControlLabel
                      className="pl-0"
                      control={
                        <Checkbox
                          data-cy="soldCheckBox"
                          className=" pl-0"
                          checked={listing.sold}
                          onChange={(e) => handleSold(e, listing)}
                          name="sold"
                          color="primary"
                        />
                      }
                      label={listing.sold ? "Solgt" : "Marker som solgt"}
                    />
                  )}
              </CardActions>
            </Card>
          ))}
      </Grid>
    </>
  );
};

export default ListingOverview;
