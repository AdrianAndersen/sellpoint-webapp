import { FormControlLabel, Switch } from "@material-ui/core";
import { useState } from "react";
import SignUpCompany from "../components/SignUpComponents/SignUpCompany";
import SignUpUser from "../components/SignUpComponents/SignUppageUser";
import { useContext } from "react";
import { Context } from "../components/Store";
import Head from "next/head";
import { UserEntity } from "../components/Types";

const LoginPage = () => {
  const [person, setPerson] = useState(true);
  // @ts-ignore
  const [state, dispatch] = useContext(Context);
  const newUserId = (): string => {
    const randomId = Math.random().toString(36).substring(7);
    if (state.users.find((user: UserEntity) => user.id === randomId)) {
      return newUserId();
    }
    return randomId;
  };

  let status = "";
  person ? (status = "Privat") : (status = "Bedrift");
  return (
    <div>
      <Head>
        <title>Ny bruker | Sellpoint</title>
      </Head>
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
              createUser={(user: Partial<UserEntity>) =>
                dispatch({
                  type: "ADD_USER",
                  payload: { ...user, id: newUserId() },
                })
              }
            />
          </div>
        ) : (
          <div className="w-full flex flex-row justify-center">
            <SignUpCompany
              createUser={(user: Partial<UserEntity>) =>
                dispatch({
                  type: "ADD_USER",
                  payload: { ...user, id: newUserId() },
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
