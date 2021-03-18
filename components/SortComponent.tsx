import Select from "@material-ui/core/Select";
import { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { useGlobalState } from "./GlobalStateProvider";
import { getExactDistance } from "./GoogleMaps/GoogleMapsComponent";
import { LatLng } from "./Types";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

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

  const handleChange = (event: any) => {
    const selectValue = event.target.value;

    setSelect(selectValue);
    if (selectValue === "high") {
      state.listings.sort((a, b) => b.price - a.price);
      dispatch({ type: "SET_LISTINGS", payload: state.listings });
    } else if (selectValue === "low") {
      state.listings.sort((a, b) => a.price - b.price);
      dispatch({ type: "SET_LISTINGS", payload: state.listings });
    } else if (selectValue === "dist_low") {
      sortDistance(true);

      dispatch({ type: "SET_LISTINGS", payload: state.listings });
    } else if (selectValue == "dist_high") {
      sortDistance(false);

      dispatch({ type: "SET_LISTINGS", payload: state.listings });
    }
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-helper-label">Sort By</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={select}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"low"}>Lowest Price </MenuItem>
        <MenuItem value={"high"}>Highest Price</MenuItem>
        {state.currentUser && (
          <MenuItem value={"dist_low"}>Lowest distance</MenuItem>
        )}
        {state.currentUser && (
          <MenuItem value={"dist_high"}>Highest distance</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default SortComponent;
