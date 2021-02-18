import Typography from "@material-ui/core/Typography";
import { FormControlLabel, Switch } from "@material-ui/core";
import { useState } from "react";
import SignUpCompany from "../components/SignUpComponents/SignUpCompany";
import SignUpUser from "../components/SignUpComponents/SignUppageUser";

const LoginPage = () => {
  const [person, setPerson] = useState(true);
  var status = "";
  person ? (status = "Company?") : (status = "Personal?");
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
          <div className="w-full h-5/6 bg-gray-400 p-10 text-center">
            <Typography
              variant="h6"
              className="h-full flex flex-col justify-center"
            >
              <SignUpUser />
            </Typography>
          </div>
        ) : (
          <div className="w-full h-5/6 bg-red-400 p-10 text-center">
            <Typography
              variant="h6"
              className="h-full flex flex-col justify-center"
            >
              <SignUpCompany />
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
