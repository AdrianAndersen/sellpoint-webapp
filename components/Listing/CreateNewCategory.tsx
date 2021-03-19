import { useState } from "react";
import { Button, createStyles, makeStyles, TextField } from "@material-ui/core";
import { useGlobalState } from "../StateManagement/GlobalStateProvider";
import { AddBox } from "@material-ui/icons";

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

  return (
    <div className="w-full my-4 flex flex-row items-center">
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
              await fetch("/api/categories", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: category }),
              });
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
