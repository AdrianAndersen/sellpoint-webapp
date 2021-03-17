import { Button, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";
import { useGlobalState } from "../GlobalStateProvider";
import { User } from "../Types";

const UserManager = () => {
  const { state, dispatch } = useGlobalState();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState("");

  const currentUser = state.users.find((user) => user.id === state.currentUser);
  if (currentUser?.role !== "admin") {
    return (
      <div>
        <Typography color="error">
          Du har ikke rettigheter til å se brukere.
        </Typography>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-row">
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
        onClick={(e) => {
          e.preventDefault();
          if (selectedUser) {
            dispatch({
              type: "REMOVE_USER",
              payload: selectedUser.id,
            });
            setSelectedUser(null);
            setInputValue("");
          }
        }}
      >
        Delete
      </Button>
    </div>
  );
};

export default UserManager;
