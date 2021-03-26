import RatingComponent from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useGlobalState } from "../StateManagement/GlobalStateProvider";
import { User, Listing } from "../../lib/Types";
import { patchListingDB } from "../../lib/requests";

const averageRating = (listings: Listing[]) => {
  const rating =
    listings.reduce((prev, curr) => prev + (curr.rating ? curr.rating : 0), 0) / listings.length;

  if (isNaN(rating)) {
    return 0;
  }

  return rating;
};

export default function SimpleRating({ user }: { user: User }) {
  const { state, dispatch } = useGlobalState();
  const userListings = state.listings.filter((listing) => listing.owner === user.id);
  const currentUser = state.users.find((u) => u.id === state.currentUser);

  const avgRating = averageRating(userListings);
  const boughtListings = userListings.filter(
    (listing) => listing.soldToId === currentUser?.id
  );

  return (
    <Box
      data-cy="rating"
      className="flex flex-col items-center"
      component="fieldset"
      mb={3}
      borderColor="transparent"
    >
      <Typography component="span">Rating ({avgRating})</Typography>
      <RatingComponent
        name="simple-controlled"
        readOnly={
          currentUser === undefined ||
          currentUser.id === user.id ||
          boughtListings.length === 0
        }
        value={avgRating}
        onChange={(_event, newValue) => {
          if (newValue === null || state.currentUser === undefined) {
            return;
          }

          const previouslyRatedListing = boughtListings.find((listing) => listing.rating !== null);
          const listingToRate = previouslyRatedListing ? previouslyRatedListing : boughtListings[0];

          listingToRate.rating = newValue;

          dispatch({
            type: "SET_LISTINGS",
            payload: state.listings,
          });

          if (state.usingDB) {
            patchListingDB(listingToRate);
          }
        }}
      />
    </Box>
  );
}
