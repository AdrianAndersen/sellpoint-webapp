import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import { useGlobalState } from "./GlobalStateProvider";
import { getUniqueId } from "../lib/utils";
import { Advertisement } from "./Types";
import Link from "next/link";

const CreateNewAdvertisement = ({
  initialAdvertisement,
}: {
  initialAdvertisement?: Advertisement;
}) => {
  const [title, setTitle] = useState(initialAdvertisement?.title);
  const [link, setLink] = useState(initialAdvertisement?.link);
  const [imageURL, setImageURL] = useState(initialAdvertisement?.imageURL);
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
        <Link href="/">
          <Button variant="contained" color="secondary">
            Cancel
          </Button>
        </Link>
        <Button
          data-cy="submit"
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            let id;
            if (initialAdvertisement) {
              dispatch({
                type: "REMOVE_ADVERTISEMENT",
                payload: initialAdvertisement.id,
              });
              id = initialAdvertisement.id;
            } else {
              id = getUniqueId(state.users.map((user) => user.id));
            }

            dispatch({
              type: "ADD_ADVERTISEMENT",
              payload: {
                id: id,
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
