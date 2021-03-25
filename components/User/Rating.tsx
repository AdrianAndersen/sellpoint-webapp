import RatingComponent from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useGlobalState } from "../StateManagement/GlobalStateProvider";
import { User, Rating } from "../../lib/Types";
import { updateUserDB } from "../../lib/requests";

const averageRating = (ratings: Rating[]) => {
  const rating =
    ratings.reduce((prev, curr) => prev + curr.rating, 0) / ratings.length;

  if (isNaN(rating)) {
    return 0;
  }

  return rating;
};

export default function SimpleRating({ user }: { user: User }) {
  const { state, dispatch } = useGlobalState();
  const currentUser = state.users.find((user) => user.id === state.currentUser);

  const avgRating = averageRating(user.ratings);

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
          currentUser.role === "business"
        }
        value={avgRating}
        onChange={async (_event, newValue) => {
          if (newValue === null || state.currentUser === undefined) {
            return;
          }

          const previousRating = user.ratings.find(
            (rating) => rating.from === state.currentUser
          );

          if (previousRating) {
            previousRating.rating = newValue;
          } else {
            user.ratings.push({
              from: state.currentUser,
              rating: newValue,
            });
          }

          dispatch({
            type: "SET_USERS",
            payload: state.users,
          });

          if (state.usingDB) {
            updateUserDB(user);
          }
        }}
      />
    </Box>
  );
}
