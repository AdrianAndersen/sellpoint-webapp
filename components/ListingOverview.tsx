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
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

const ListingOverview = () => {
  const classes = useStyles();
  const { data, error } = useSWR<Array<any>>("/api/listings", fetcher);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  if (error) return <div>Failed to load listings</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Grid container direction="row" justify="center" alignItems="flex-start">
      {data.map((l: any, index: number) => (
        <Card className={classes.card} key={index}>
          <CardHeader
            avatar={<Avatar>ON</Avatar>}
            title={l.title}
            subheader="01/01/1970"
          />
          <CardMedia className={classes.media} image={l.imageURL} />
          <CardContent>
            <Typography gutterBottom variant="button" component="h2">
              {l.price} kr
            </Typography>
            <Typography variant="body1">{l.description}</Typography>
          </CardContent>
          <CardActions>
            <Button>Se mer</Button>
            {/* TODO: Check if user is admin */}
            <Link href={"/edit-listing?id=" + index}>
              <Button color="secondary">Endre</Button>
            </Link>
            <Button
              color="secondary"
              onClick={() => {
                // TODO: Actually delete listing
                delete data[index];
                forceUpdate();
              }}
            >
              Slett
            </Button>
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
};

export default ListingOverview;
