import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import { useGlobalState } from "./GlobalStateProvider";
import { getUniqueId } from "../lib/utils";

const CreateNewAdvertisement = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [imageURL, setImageURL] = useState("");
  const router = useRouter();
  const { state, dispatch } = useGlobalState();
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
        name="link"
        label="Link"
        variant="filled"
        margin="normal"
        value={link}
        multiline={true}
        onChange={(evt) => setLink(evt.target.value)}
      />
      <TextField
        name="imageURL"
        label="Bilde-URL"
        variant="filled"
        margin="normal"
        value={imageURL}
        multiline={true}
        onChange={(evt) => setImageURL(evt.target.value)}
      />
      <div className="flex flex-row justify-end space-x-4 my-8">
        <Button variant="contained" color="secondary">
          Cancel
        </Button>
        <Button
          data-cy="submit"
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            dispatch({
              type: "ADD_ADVERTISEMENT",
              payload: {
                id: getUniqueId(state.advertisements.map((ad) => ad.id)),
                title: title,
                link: link,
                imageURL: imageURL,
                owner: state.currentUser,
              },
            });
            router.push("/");
          }}
        >
          Lag reklame
        </Button>
      </div>
    </form>
  );
};

export default CreateNewAdvertisement;
