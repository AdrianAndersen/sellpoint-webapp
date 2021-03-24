import { Button, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Delete } from "@material-ui/icons";
import { useState } from "react";
import { useGlobalState } from "../StateManagement/GlobalStateProvider";
import { User } from "../../lib/Types";
import { error } from "../../lib/toasts";
import { deleteUserDB } from "../../lib/requests";

const UserManager = () => {
  const { state, dispatch } = useGlobalState();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState("");

  const currentUser = state.users.find((user) => user.id === state.currentUser);
  if (currentUser?.role !== "admin") {
    error("Du har ikke rettigheter til å se brukere.");
    return (
      <div>
        <Typography color="error">
          Du har ikke rettigheter til å se brukere.
        </Typography>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-row items-center">
      <Autocomplete
        className="mr-4"
        value={selectedUser}
        onChange={(_event, newValue) => setSelectedUser(newValue)}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
        options={state.users.filter((user) => user.id !== state.currentUser)}
        getOptionLabel={(option) => `${option.name} (${option.username})`}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            name="userToDelete"
            label="Velg en bruker"
            variant="outlined"
          />
        )}
      />

      <Button
        data-cy="deleteUserBtn"
        variant="contained"
        color="secondary"
        style={{ height: 50, width: 100 }}
        startIcon={<Delete />}
        onClick={async (e) => {
          e.preventDefault();
          if (selectedUser) {
            if (selectedUser.role !== "business") {
              state.listings
                .filter((listing) => listing.owner === selectedUser.id)
                .forEach((listing) => {
                  dispatch({
                    type: "REMOVE_LISTING",
                    payload: listing.id,
                  });
                });
            }

            if (selectedUser.role !== "private") {
              state.advertisements
                .filter((ad) => ad.owner === selectedUser.id)
                .forEach((ad) => {
                  dispatch({
                    type: "REMOVE_ADVERTISEMENT",
                    payload: ad.id,
                  });
                });
            }
            if (state.usingDB) {
              const userListings = state.listings
                .filter((listing) => listing.owner === currentUser.id)
                .map((listing) => listing.id);
              const userAds = state.advertisements
                .filter((ad) => ad.owner === currentUser.id)
                .map((ad) => ad.id);
              await deleteUserDB({
                userId: currentUser.id,
                ads: userAds,
                listings: userListings,
              });
            }
            dispatch({
              type: "REMOVE_USER",
              payload: selectedUser.id,
            });
            setSelectedUser(null);
            setInputValue("");
          }
        }}
      >
        Slett
      </Button>
    </div>
  );
};

export default UserManager;
