import { useGlobalState } from "../StateManagement/GlobalStateProvider";
import { Select, Typography } from "@material-ui/core";
import { useState } from "react";
import { UserRole } from "../../lib/Types";
import { updateRoleDB } from "../../lib/requests";
import { success } from "../../lib/toasts";

const UserRoleManager = () => {
  const { state, dispatch } = useGlobalState();
  const [selectedUser, setSelectedUser] = useState("chooseUser");
  const legalRoles = ["private", "business", "admin"];

  const prettyRole = (role: string) =>
    role === "private"
      ? "Privatbruker"
      : role === "business"
      ? "Bedriftsbruker"
      : "Administrator";

  const updateUserRole = (newRole: UserRole) => {
    const updatedUser = state.users.find(
      (user) => user.id === Number(selectedUser)
    );
    if (updatedUser) {
      const users = state.users.filter((user) => user.id !== updatedUser.id);
      updatedUser.role = newRole;
      users.push(updatedUser);
      dispatch({ type: "SET_USERS", payload: users });
      if (state.usingDB) {
        updateRoleDB({ id: updatedUser.id, role: newRole });
      }
      const roleMessage =
        updatedUser.name + " har nå rollen " + prettyRole(updatedUser.role);
      success(roleMessage);
    }
  };

  const currentUser = state.users.find((user) => user.id === state.currentUser);
  if (currentUser?.role !== "admin") {
    return (
      <div>
        <Typography color="error">
          Du har ikke rettigheter til å endre brukerroller.
        </Typography>
      </div>
    );
  }
  return (
    <>
      <Typography variant="h6" className="text-center">
        Endre roller
      </Typography>
      <div className="mb-4 flex justify-center">
        <Select
          className="p-2"
          data-cy="selectUser"
          onChange={(e) => {
            const selectVal = e.target.value as string;
            setSelectedUser(selectVal);
          }}
          value={selectedUser}
        >
          <option className="cursor-pointer" value="chooseUser">
            Velg bruker
          </option>
          {state.users.map((user) => (
            <option className="cursor-pointer" key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Select>
        <Select
          className="p-2"
          data-cy="selectRole"
          disabled={selectedUser === "chooseUser"}
          value={
            selectedUser === "chooseUser"
              ? "chooseUser"
              : state.users.find((user) => user.id === Number(selectedUser))
                  ?.role
          }
          onChange={(e) => updateUserRole(e.target.value as UserRole)}
        >
          {selectedUser === "chooseUser" ? (
            <option className="cursor-pointer" value="chooseUser"></option>
          ) : (
            legalRoles.map((role) => (
              <option className="cursor-pointer" key={role} value={role}>
                {prettyRole(role)}
              </option>
            ))
          )}
        </Select>
      </div>
    </>
  );
};
export default UserRoleManager;
