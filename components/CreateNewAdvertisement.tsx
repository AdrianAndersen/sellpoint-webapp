import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Context } from "./Store";

const CreateNewAdvertisement = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [imageURL, setImageURL] = useState("");
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
        label="Link"
        variant="filled"
        margin="normal"
        value={link}
        multiline={true}
        onChange={(evt) => setLink(evt.target.value)}
      />
      <TextField
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
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            let id;
            if (state.advertisements.length === 0) {
              id = 0;
            } else {
              id =
                state.advertisements.reduce(
                  (prev_ad: { id: number }, current_ad: { id: number }) => {
                    return prev_ad.id > current_ad.id ? prev_ad : current_ad;
                  }
                ).id + 1;
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
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CreateNewAdvertisement;
