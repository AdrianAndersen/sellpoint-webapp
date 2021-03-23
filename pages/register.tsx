import { FormControlLabel, Switch } from "@material-ui/core";
import { useState } from "react";
import SignUp from "../components/User/SignUp";
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
        <div className="w-full flex flex-row justify-center">
          <SignUp role={person ? "private" : "business"} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
