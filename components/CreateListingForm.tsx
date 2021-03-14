import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import Link from "next/link";
import { useContext } from "react";
import { Context } from "./Store";
import { useRouter } from "next/router";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { MenuProps } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    selectInput: {},
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MENU_PROPS: Partial<MenuProps> = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  variant: "menu",
  getContentAnchorEl: null,
};

const CreateListingForm = ({
  initialListing = null,
}: {
  initialListing?: any;
}) => {
  const router = useRouter();
  // @ts-ignore
  const [state, dispatch] = useContext(Context);

  const [title, setTitle] = useState(initialListing?.title);
  const [description, setDescription] = useState(initialListing?.description);
  const [price, setPrice] = useState(initialListing?.price);
  const [imageURL, setImageURL] = useState(initialListing?.imageURL);
  const [selectedCategories, setSelectedCategories] = useState(
    initialListing?.categories ?? []
  );

  const classes = useStyles();

  return (
    <form className="w-1/2 p-4 flex flex-col">
      <TextField
        name="title"
        label="Tittel"
        variant="filled"
        margin="normal"
        value={title}
        onChange={(evt) => setTitle(evt.target.value)}
      />
      <TextField
        name="desc"
        label="Beskrivelse"
        variant="filled"
        margin="normal"
        multiline={true}
        rows={3}
        value={description}
        onChange={(evt) => setDescription(evt.target.value)}
      />
      <TextField
        name="price"
        type="number"
        label="Pris"
        variant="filled"
        margin="normal"
        value={"" + price}
        onChange={(evt) => setPrice(parseInt(evt.target.value, 10))}
      />
      <TextField
        name="imageURL"
        label="Bilde-URL"
        variant="filled"
        margin="normal"
        multiline={true}
        value={imageURL}
        onChange={(evt) => setImageURL(evt.target.value)}
      />
      <FormControl className={classes.formControl}>
        <InputLabel id="categories-label">Kategorier</InputLabel>
        <Select
          labelId="categories-label"
          id="categories-select"
          multiple
          value={selectedCategories}
          onChange={(e: any) => setSelectedCategories(e.target.value)}
          input={<Input className={classes.selectInput} />}
          renderValue={(selected: any) => selected.join(", ")}
          MenuProps={MENU_PROPS}
        >
          {state.categories.map((category: any) => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={selectedCategories.includes(category)} />
              <ListItemText primary={category} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="flex flex-row justify-end space-x-4 my-8">
        <Link href="/">
          <Button variant="contained" color="secondary">
            Cancel
          </Button>
        </Link>
        <Button
          data-cy="submit"
          onClick={(e) => {
            e.preventDefault();
            let id;
            if (initialListing === null) {
              if (state.listings.length === 0) {
                id = 0;
              } else {
                id =
                  state.listings.reduce(
                    (
                      prev_listing: { id: number },
                      current_listing: { id: number }
                    ) => {
                      return prev_listing.id > current_listing.id
                        ? prev_listing
                        : current_listing;
                    }
                  ).id + 1;
              }
            } else {
              dispatch({ type: "REMOVE_LISTING", payload: initialListing.id });
              id = initialListing.id;
            }

            dispatch({
              type: "ADD_LISTING",
              payload: {
                id: id,
                title: title,
                description: description,
                price: price,
                imageURL: imageURL,
                owner: state.currentUser,
                categories: selectedCategories,
              },
            });
            router.push("/listings/" + id);
          }}
          variant="contained"
          color="primary"
        >
          Lag annonse
        </Button>
      </div>
    </form>
  );
};

export default CreateListingForm;
