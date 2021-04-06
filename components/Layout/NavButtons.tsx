import Link from "next/link";
import { useGlobalState } from "../StateManagement/GlobalStateProvider";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { Component, MouseEventHandler } from "react";

const useStyles = makeStyles(() =>
  createStyles({
    listNavbar: {
      display: "flex",
      flexDirection: "row",
    },
    listDrawer: {
      minWidth: 200,
    },
  })
);

const makeLinkItem = (
  isInDrawer: boolean,
  onClick?: MouseEventHandler<unknown>
) => {
  const LinkItem = ({
    text,
    icon,
    link,
    ...buttonProps
  }: {
    text: string;
    icon?: Component;
    link: string;
  }) => {
    return isInDrawer ? (
      <Link href={link}>
        <ListItem {...buttonProps} button onClick={onClick}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText primary={text} />
        </ListItem>
      </Link>
    ) : (
      <Link href={link}>
        <Button {...buttonProps} color="inherit" onClick={onClick}>
          <Typography>{text}</Typography>
          {icon && icon}
        </Button>
      </Link>
    );
  };
  return LinkItem;
};

const NavButtons = ({
  isInDrawer = false,
  onListItemClick,
}: {
  isInDrawer: boolean;
  onListItemClick?: MouseEventHandler<unknown>;
}) => {
  const { state } = useGlobalState();
  const currentUser = state.users.find((user) => user.id === state.currentUser);

  const classes = useStyles();
  const LinkItem = makeLinkItem(isInDrawer, onListItemClick);

  return (
    <List className={isInDrawer ? classes.listDrawer : classes.listNavbar}>
      {currentUser && currentUser.role === "admin" && (
        <LinkItem link="/admin" text="Admin" data-cy="navAdminBtn" />
      )}
      {currentUser && currentUser.role !== "private" && (
        <LinkItem link="/new-ad" text="Ny reklame" data-cy="navNewAdBtn" />
      )}
      {currentUser && currentUser.role !== "business" && (
        <LinkItem
          link="/new-listing"
          text="Ny annonse"
          data-cy="navNewListingBtn"
        />
      )}

      {state.currentUser && (
        <LinkItem
          link={"/users/" + state.currentUser}
          text="Min profil"
          data-cy="myProfileBtn"
        />
      )}
    </List>
  );
};

export default NavButtons;
