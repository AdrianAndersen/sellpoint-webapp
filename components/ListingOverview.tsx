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
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import Link from "next/link";
import { useReducer } from "react";
import { useGlobalState } from "./GlobalStateProvider";
import moment from "moment";
import { getPrettyDistance } from "./GoogleMaps/GoogleMapsComponent";
import { Category } from "./Types";
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
}));

const ListingOverview = ({ categories }: { categories: Category[] }) => {
  const classes = useStyles();
  const { state, dispatch } = useGlobalState();
  const currentUser = state.users.find((user) => user.id === state.currentUser);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
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
            <Card className={classes.card} key={listing.id}>
              <CardHeader
                avatar={<Avatar></Avatar>}
                title={listing.title}
                subheader={moment().format("DD/MM/YYYY")}
              />
              <CardMedia className={classes.media} image={listing.imageURL} />
              <CardContent>
                <Typography gutterBottom variant="button" component="h2">
                  {listing.price} kr
                </Typography>
                <Typography gutterBottom variant="button" component="h2">
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
              <CardActions>
                <Link href={"/listings/" + listing.id}>
                  <Button data-cy="viewListing">Se mer</Button>
                </Link>
                {currentUser && currentUser.role === "admin" && (
                  <>
                    <Link href={"/edit-listing/" + listing.id}>
                      <IconButton color="secondary">
                        <Edit />
                      </IconButton>
                    </Link>
                    <IconButton
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
              </CardActions>
            </Card>
          ))}
      </Grid>
    </>
  );
};

export default ListingOverview;
