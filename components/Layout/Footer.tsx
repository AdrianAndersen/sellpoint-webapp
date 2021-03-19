import {
  Button,
  Container,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import Link from "next/link";

const useStyles = makeStyles((theme) =>
  createStyles({
    footer: {
      backgroundColor: theme.palette.primary.light,
    },
  })
);

const Footer = ({ data }: { data: any }) => {
  const classes = useStyles();

  return (
    <footer className={classes.footer + " w-full mt-5 pt-5 pb-1"}>
      <Container className="text-center">
        <Typography>Laget av</Typography>
        <div>
          <Link href="https://github.com/AdrianAndersen">
            <Button>Adrian Andersen</Button>
          </Link>
          <Link href="https://github.com/amatho">
            <Button>Amandus Søve Thorsrud</Button>
          </Link>
          <Link href="">
            <Button>Arash Aminpour</Button>
          </Link>
          <Link href="">
            <Button>Jacob Alexander Almnes</Button>
          </Link>
          <Link href="">
            <Button>Therese Sigmundstad</Button>
          </Link>
          <Link href="">
            <Button>Øyvind Holm Håheim</Button>
          </Link>
        </div>
        <Link href="https://github.com/AdrianAndersen/sellpoint-webapp">
          <Button>
            Github
            <GitHubIcon className="ml-1" />
          </Button>
        </Link>
        <Typography
          data-cy="dbStatus"
          variant="body2"
          className="p-2 rounded-lg"
        >
          DB:
          <Link href="/database">
            <b className="cursor-pointer">
              {" "}
              {data.usingDB ? "Connected 🚀" : "OFFLINE 🔌"}
            </b>
          </Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
