import useSWR from "swr";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useStyles = makeStyles(() => ({
  price: {
    textAlign: "end",
    paddingBottom: "0.5em",
    marginBottom: "0.5em",
    borderBottom: "1px solid #f1f1f1",
  },
}));

const ViewListing = ({ index }: { index: number }) => {
  const { data, error } = useSWR("/api/listings", fetcher);

  const classes = useStyles();

  if (error) return <div>Failed to load listings</div>;
  if (!data) return <div>Loading...</div>;

  const listing = data[index];

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
          <CardActions className="justify-end"></CardActions>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Kontakt
            </Typography>

            <Typography variant="h6">Navn:</Typography>
            <Typography gutterBottom>{listing.name}</Typography>

            <Typography variant="h6">E-post:</Typography>
            <Typography gutterBottom>{listing.email}</Typography>

            <Typography variant="h6">Telefonnummer:</Typography>
            <Typography gutterBottom>{listing.phone}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ViewListing;
