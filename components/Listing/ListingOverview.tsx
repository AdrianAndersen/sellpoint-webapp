import {
  Avatar,
  Button,
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {
  Edit,
  Delete,
  FavoriteBorder,
  Favorite,
  ContactsOutlined,
} from "@material-ui/icons";
import Link from "next/link";
import { useGlobalState } from "../StateManagement/GlobalStateProvider";
import moment from "moment";
import { getPrettyDistance } from "../GoogleMaps/GoogleMapsComponent";
import { Category, Listing } from "../../lib/Types";
import SortComponent from "./SortComponent";
import CategorySelect from "./CategorySelect";
import { useState } from "react";
import { User } from "../../lib/Types";
import { deleteListingDB, patchListingDB } from "../../lib/requests";
import { error } from "../../lib/toasts";

const useStyles = makeStyles((theme) => ({
  filterControls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
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

const ListingOverview = ({
  specificListings,
}: {
  specificListings?: Listing[];
}) => {
  const classes = useStyles();
  const { state, dispatch } = useGlobalState();
  const listings = specificListings ? specificListings : state.listings;
  const currentUser = state.users.find((user) => user.id === state.currentUser);

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [soldDialogListing, setSoldDialogListing] = useState<Listing | null>(
    null
  );
  const [selectedBuyer, setSelectedBuyer] = useState<User | null>(null);
  const [selectedBuyerInput, setSelectedBuyerInput] = useState("");

  const handleSold = async (e: any, listing: Listing) => {
    listing.sold = e.target.checked;
    dispatch({
      type: "SET_LISTINGS",
      payload: state.listings,
    });
    if (state.usingDB) {
      await patchListingDB({ id: listing.id, sold: listing.sold });
    }

    if (listing.sold) {
      setSoldDialogListing(listing);
    }
  };
  const handleFavorite = async (e: any, listing: Listing) => {
    if (currentUser?.favorites.includes(listing) && listing !== undefined) {
      var index = currentUser?.favorites.indexOf(listing);
      currentUser?.favorites.splice(index, 1);
    } else {
      currentUser?.favorites.push(listing);
    }
    try {
      if (currentUser !== undefined) {
        const userObj = state.users.find((user) => user.id === currentUser.id);
        if (userObj !== undefined) {
          const users = state.users.filter((user) => user.id !== userObj.id);
          //currentUser.role = userObj;
          users.push(userObj);
          dispatch({ type: "SET_USERS", payload: users });
        }
      }
    } catch (e) {
      error("Feil!");
    }
  };
  return (
    <>
      <div className={classes.filterControls}>
        <CategorySelect
          selected={selectedCategories}
          setSelected={setSelectedCategories}
        />
        <SortComponent />
      </div>
      <Grid
        data-cy="listingOverview"
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        {listings
          .filter(
            (listing) =>
              selectedCategories.length == 0 ||
              listing.categories.some((category) =>
                selectedCategories.includes(category)
              )
          )
          .map((listing) => (
            <Card
              className={`${classes.card} ${listing.sold ? classes.sold : ""}`}
              key={listing.id}
            >
              <CardHeader
                data-cy="listingTitle"
                avatar={
                  <Link href={"/users/" + listing.owner}>
                    <IconButton data-cy="profileBtn">
                      <Avatar />
                    </IconButton>
                  </Link>
                }
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
                <>
                  {currentUser &&
                    (currentUser.role === "admin" ||
                      currentUser.id === listing.owner) && (
                      <>
                        <Link href={"/edit-listing/" + listing.id}>
                          <IconButton data-cy="editListing" color="secondary">
                            <Edit />
                          </IconButton>
                        </Link>
                        <IconButton
                          data-cy="deleteListing"
                          color="secondary"
                          onClick={async () => {
                            dispatch({
                              type: "REMOVE_LISTING",
                              payload: listing.id,
                            });

                            if (state.usingDB) {
                              await deleteListingDB({ id: listing.id });
                            }
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </>
                    )}
                  {currentUser && currentUser.role !== "business" && (
                    <IconButton
                      data-cy="favoriteListing"
                      onClick={(e) => handleFavorite(e, listing)}
                    >
                      {currentUser.favorites.includes(listing) ? (
                        <Favorite />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                  )}
                </>

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
      <Dialog
        open={soldDialogListing !== null}
        onClose={() => setSoldDialogListing(null)}
      >
        <DialogTitle>Velg kjøper</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Velg hvilken person du selger denne annonse til.
          </DialogContentText>
          <Autocomplete
            className="mr-4"
            value={selectedBuyer}
            onChange={(_event, newValue) => setSelectedBuyer(newValue)}
            inputValue={selectedBuyerInput}
            onInputChange={(_event, newInputValue) =>
              setSelectedBuyerInput(newInputValue)
            }
            options={state.users.filter(
              (user) =>
                user.id !== state.currentUser && user.role !== "business"
            )}
            getOptionLabel={(option) => `${option.name}`}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="soldToUser"
                label="Velg en bruker"
                variant="outlined"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button
            data-cy="soldToSubmit"
            onClick={() => {
              if (selectedBuyer !== null) {
                if (soldDialogListing) {
                  soldDialogListing.soldToId = selectedBuyer.id;

                  dispatch({
                    type: "SET_LISTINGS",
                    payload: state.listings,
                  });

                  if (state.usingDB) {
                    patchListingDB({
                      id: soldDialogListing.id,
                      soldToId: soldDialogListing.soldToId,
                    });
                  }
                }

                setSoldDialogListing(null);
              }
            }}
          >
            Sett som kjøper
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ListingOverview;
