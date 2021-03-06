import { useState } from "react";
import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  useMediaQuery,
} from "@material-ui/core";
import { useGlobalState } from "../StateManagement/GlobalStateProvider";
import { AddBox } from "@material-ui/icons";
import { addCategoryDB } from "../../lib/requests";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginRight: theme.spacing(2),
      marginTop: 0,
      marginBottom: 0,
    },
  })
);

const CreateNewCategory = () => {
  const [category, setCategory] = useState("");
  const { state, dispatch } = useGlobalState();
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div
      className={
        isMobile
          ? "w-full my-4 flex flex-col items-center"
          : "w-full my-4 flex flex-row items-center"
      }
    >
      <TextField
        data-cy="newCategoryField"
        className={classes.root}
        label="Kategori"
        variant="outlined"
        margin="normal"
        value={category}
        style={{ width: 300 }}
        onChange={(evt) => setCategory(evt.target.value)}
      />
      <Button
        data-cy="newCategoryBtn"
        variant="contained"
        color="secondary"
        style={{ height: 50, width: 100 }}
        startIcon={<AddBox />}
        onClick={async (e) => {
          e.preventDefault();
          if (category !== "") {
            dispatch({
              type: "ADD_CATEGORY",
              payload: category,
            });
            if (state.usingDB) {
              await addCategoryDB({ name: category });
            }
            setCategory("");
          }
        }}
      >
        Ny
      </Button>
    </div>
  );
};
export default CreateNewCategory;
