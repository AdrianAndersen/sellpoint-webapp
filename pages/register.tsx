import { FormControlLabel, Switch } from "@material-ui/core";
import { useState } from "react";
import SignUpCompany from "../components/SignUpComponents/SignUpCompany";
import SignUpUser from "../components/SignUpComponents/SignUppageUser";
import { useContext } from "react";
import { Context } from "../components/Store";

const LoginPage = () => {
  const [person, setPerson] = useState(true);
  // @ts-ignore
  const [state, dispatch] = useContext(Context);
  const next_id = () =>
    state.users.reduce(
      (prev_user: { id: number }, current_user: { id: number }) => {
        return prev_user.id > current_user.id ? prev_user : current_user;
      }
    ).id + 1;

  let status = "";
  person ? (status = "Personal") : (status = "Company");
  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            value="checkedA"
            inputProps={{ "aria-label": "Switch A" }}
            onChange={() => setPerson(!person)}
          />
        }
        label={status}
      />

      <div>
        {person ? (
          <div className="w-full flex flex-row justify-center">
            <SignUpUser
              createUser={(user: any) =>
                dispatch({
                  type: "ADD_USER",
                  payload: { ...user, id: next_id() },
                })
              }
            />
          </div>
        ) : (
          <div className="w-full flex flex-row justify-center">
            <SignUpCompany
              createUser={(user: any) =>
                dispatch({
                  type: "ADD_USER",
                  payload: { ...user, id: next_id() },
                })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
