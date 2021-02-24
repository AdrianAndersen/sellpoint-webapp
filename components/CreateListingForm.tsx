import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import Link from "next/link";
import { useContext } from "react";
import { Context } from "./Store";
import { useRouter } from "next/router";

const CreateListingForm = ({
  initialListing = null,
}: {
  initialListing?: any;
}) => {
  const [title, setTitle] = useState(initialListing?.title);
  const [description, setDescription] = useState(initialListing?.description);
  const [price, setPrice] = useState(initialListing?.price);
  const [imageURL, setImageURL] = useState(initialListing?.imageURL);

  const router = useRouter();
  // @ts-ignore
  const [state, dispatch] = useContext(Context);
  return (
    <form className="w-1/2 p-4 flex flex-col">
      <TextField
        label="Title"
        variant="filled"
        margin="normal"
        value={title}
        onChange={(evt) => setTitle(evt.target.value)}
      />
      <TextField
        label="Description"
        variant="filled"
        margin="normal"
        multiline={true}
        rows={3}
        value={description}
        onChange={(evt) => setDescription(evt.target.value)}
      />
      <TextField
        type="number"
        label="Price"
        variant="filled"
        margin="normal"
        value={"" + price}
        onChange={(evt) => setPrice(parseInt(evt.target.value, 10))}
      />
      <TextField
        label="Bilde-URL"
        variant="filled"
        margin="normal"
        multiline={true}
        value={imageURL}
        onChange={(evt) => setImageURL(evt.target.value)}
      />
      <div className="flex flex-row justify-end space-x-4 my-8">
        <Link href="/">
          <Button variant="contained" color="secondary">
            Cancel
          </Button>
        </Link>
        <Button
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
              },
            });
            router.push("/listings/" + id);
          }}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CreateListingForm;
