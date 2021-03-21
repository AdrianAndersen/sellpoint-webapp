import Select from "@material-ui/core/Select";
import { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useGlobalState } from "../StateManagement/GlobalStateProvider";
import { getExactDistance } from "../GoogleMaps/GoogleMapsComponent";
import { LatLng } from "../../lib/Types";

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      minWidth: 150,
      margin: theme.spacing(1),
    },
    select: {
      backgroundColor: "#ffffff",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const SortComponent = () => {
  const { state, dispatch } = useGlobalState();
  const classes = useStyles();
  const [select, setSelect] = useState("");

  const currentUser = state.users.find((user) => user.id === state.currentUser);

  const sortDistance = (x: boolean) => {
    state.listings.sort((a, b) => {
      let locA: LatLng;
      let locB: LatLng;
      let locCurrent: LatLng;
      const userA = state.users.find((user) => user.id === a.owner);
      const userB = state.users.find((user) => user.id === b.owner);

      if (userA && userB && currentUser) {
        locA = userA.location;
        locB = userB.location;
        locCurrent = currentUser.location;
      } else {
        return 0;
      }

      return x
        ? getExactDistance(locCurrent, locA) -
            getExactDistance(locCurrent, locB)
        : getExactDistance(locCurrent, locB) -
            getExactDistance(locCurrent, locA);
    });

    dispatch({ type: "SET_LISTINGS", payload: state.listings });
  };

  const sortBy = (param: string) => {
    if (param === select) return;
    setSelect(param);
    if (param === "high") {
      state.listings.sort((a, b) => b.price - a.price);
      dispatch({ type: "SET_LISTINGS", payload: state.listings });
    } else if (param === "low") {
      state.listings.sort((a, b) => a.price - b.price);
      dispatch({ type: "SET_LISTINGS", payload: state.listings });
    } else if (param === "dist_low") {
      sortDistance(true);

      dispatch({ type: "SET_LISTINGS", payload: state.listings });
    } else if (param == "dist_high") {
      sortDistance(false);

      dispatch({ type: "SET_LISTINGS", payload: state.listings });
    }
  };

  const handleChange = (event: any) => {
    const selectValue = event.target.value;
    sortBy(selectValue);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-helper-label">Sortér etter</InputLabel>
      <Select
        data-cy="selSort"
        labelId="demo-simple-select-helper-label"
        label="Sortér etter"
        id="demo-simple-select-helper"
        value={select}
        onChange={handleChange}
        classes={{ root: classes.select }}
      >
        <MenuItem value="">
          <em>Ingen</em>
        </MenuItem>
        <MenuItem value={"low"}>Lavest pris</MenuItem>
        <MenuItem value={"high"}>Høyest pris</MenuItem>
        {state.currentUser && (
          <MenuItem value={"dist_low"}>Lavest avstand</MenuItem>
        )}
        {state.currentUser && (
          <MenuItem value={"dist_high"}>Høyest avstand</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default SortComponent;
