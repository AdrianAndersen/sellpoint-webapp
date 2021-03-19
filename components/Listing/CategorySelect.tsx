import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useGlobalState } from "../StateManagement/GlobalStateProvider";
import { Category } from "../../lib/Types";
import { Dispatch, SetStateAction } from "react";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: "white",
    },
  })
);

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
    <>
      <ToggleButtonGroup
        data-cy="categoryButtons"
        classes={{
          root: classes.root,
        }}
        value={selected}
        onChange={(_, newCategories) => setSelected(newCategories)}
      >
        {state.categories.map((category: Category) => (
          <ToggleButton key={category} value={category}>
            {category}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
};

export default CategorySelect;