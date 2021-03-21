import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useGlobalState } from "../StateManagement/GlobalStateProvider";
import { Category } from "../../lib/Types";
import { Dispatch, SetStateAction } from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  MenuProps,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      width: 240,
      margin: theme.spacing(1),
    },
    select: {
      backgroundColor: "#ffffff",
    },
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MENU_PROPS: Partial<MenuProps> = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  variant: "menu",
  getContentAnchorEl: null,
};

const CategorySelect = ({
  selected,
  setSelected,
}: {
  selected: Category[];
  setSelected: Dispatch<SetStateAction<Category[]>>;
}) => {
  const { state } = useGlobalState();
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} variant="outlined">
      <InputLabel id="categories-label">Velg kategori</InputLabel>
      <Select
        data-cy="categorySelect"
        labelId="categories-label"
        label="Velg kategori"
        multiple
        value={selected}
        onChange={(e) => setSelected(e.target.value as Category[])}
        renderValue={(sel) => (sel as Category[]).join(", ")}
        MenuProps={MENU_PROPS}
        classes={{ root: classes.select }}
      >
        {state.categories.map((category: Category) => (
          <MenuItem key={category} value={category}>
            <Checkbox checked={selected.includes(category)} />
            <ListItemText primary={category} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
