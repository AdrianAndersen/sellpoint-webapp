import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import { useReducer } from "react";
import { useContext } from "react";
import { Context } from "./Store";
import moment from "moment";

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

const ListingOverview = ({
  listings,
  deleteListing,
  categories,
}: {
  listings: any;
  deleteListing: any;
  categories: any;
}) => {
  const classes = useStyles();
  // @ts-ignore
  const [state] = useContext(Context);
  const currentUser = state.users.find(
    (user: { id: number }) => user.id === state.currentUser
  );
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  return (
    <Grid container direction="row" justify="center" alignItems="flex-start">
      {listings
        .filter(
          (listing: any) =>
            categories.length == 0 ||
            listing.categories.some((category: any) =>
              categories.includes(category)
            )
        )
        .map((listing: any) => (
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
              <Typography variant="body1">
                {listing.description.substr(0, 50) + "..."}
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={"/listings/" + listing.id}>
                <Button>Se mer</Button>
              </Link>
              {currentUser && currentUser.role === "admin" && (
                <>
                  <Link href={"/edit-listing/" + listing.id}>
                    <Button color="secondary">Endre</Button>
                  </Link>
                  <Button
                    color="secondary"
                    onClick={() => {
                      deleteListing(listing.id);
                      forceUpdate();
                    }}
                  >
                    Slett
                  </Button>
                </>
              )}
            </CardActions>
          </Card>
        ))}
    </Grid>
  );
};

export default ListingOverview;
