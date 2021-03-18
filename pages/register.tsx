import { FormControlLabel, Switch } from "@material-ui/core";
import { useState } from "react";
import SignUpCompany from "../components/User/SignUpCompany";
import SignUpUser from "../components/User/SignUppageUser";
import Head from "next/head";

const LoginPage = () => {
  const [person, setPerson] = useState(true);

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
            data-cy="accountSwitch"
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
            <SignUpUser />
          </div>
        ) : (
          <div className="w-full flex flex-row justify-center">
            <SignUpCompany />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
