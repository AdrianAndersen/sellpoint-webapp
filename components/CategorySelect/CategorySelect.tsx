import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import { Context } from "../Store";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: "white",
    },
  })
);

const CategorySelect = ({
  selected,
  onChange,
}: {
  selected: any;
  onChange: any;
}) => {
  // @ts-ignore
  const [state] = useContext(Context);
  const classes = useStyles();

  return (
    <>
      <ToggleButtonGroup
        classes={{
          root: classes.root,
        }}
        value={selected}
        onChange={(_, newCategories) => onChange(newCategories)}
      >
        {state.categories.map((category: any) => (
          <ToggleButton key={category} value={category}>
            {category}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
};

export default CategorySelect;
