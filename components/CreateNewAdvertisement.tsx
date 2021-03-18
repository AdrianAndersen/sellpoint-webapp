import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import { useGlobalState } from "./GlobalStateProvider";
import { Advertisement } from "./Types";
import Link from "next/link";
import validateAdvertisement from "./SignUpComponents/AdvertisementValidator";

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
          onClick={async (e) => {
            e.preventDefault();
            const advertisement = {
              title: title,
              link: link,
              imageURL: imageURL,
              owner: state.currentUser,
            };

            if (validateAdvertisement(advertisement)) {
              if (initialAdvertisement) {
                dispatch({
                  type: "REMOVE_ADVERTISEMENT",
                  payload: initialAdvertisement.id,
                });
              }
              if (state.usingDB) {
                if (initialAdvertisement) {
                  await fetch("/api/advertisements", {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: initialAdvertisement.id }),
                  });
                }
                const response = await fetch("/api/advertisements", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(advertisement),
                }).then((response) => response.json());
                if (response) {
                  dispatch({
                    type: "ADD_ADVERTISEMENT",
                    payload: { id: response.id, ...advertisement },
                  });
                  router.push("/");
                }
              } else {
                dispatch({
                  type: "ADD_ADVERTISEMENT",
                  payload: {
                    id: Math.floor(Math.random() * Math.floor(10000000)),
                    ...advertisement,
                  },
                });
                router.push("/");
              }
            } else {
              alert("Du må fylle ut alle feltene!");
            }
          }}
        >
          Lag reklame
        </Button>
      </div>
    </form>
  );
};

export default CreateNewAdvertisement;
