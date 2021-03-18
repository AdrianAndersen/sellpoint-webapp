import { useState } from "react";
import { Button, createStyles, makeStyles, TextField } from "@material-ui/core";
import { useGlobalState } from "./GlobalStateProvider";
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
  const { dispatch } = useGlobalState();
  const classes = useStyles();

  return (
    <div className="w-full my-4 flex flex-row items-center">
      <TextField
        className={classes.root}
        label="Kategori"
        variant="outlined"
        margin="normal"
        value={category}
        style={{ width: 300 }}
        onChange={(evt) => setCategory(evt.target.value)}
      />
      <Button
        variant="contained"
        color="secondary"
        style={{ height: 50, width: 100 }}
        startIcon={<AddBox />}
        onClick={(e) => {
          e.preventDefault();
          if (category !== "") {
            dispatch({
              type: "ADD_CATEGORY",
              payload: category,
            });
            setCategory("");
          }
        }}
      >
        NY
      </Button>
    </div>
  );
};
export default CreateNewCategory;
