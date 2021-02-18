import { TextField } from "@material-ui/core";
import { useState } from "react";
import styles from "../../styles/SignUpPage.module.css";

export default function SignUpCompany() {
  const [compName, setcompName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [confPassword, setConfPass] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitting  ${compName} , ${email}, 
    ${password}, ${confPassword}`);
  };
  return (
    <div className={styles.signUpCommpanywrapper}>
      <h1>Create Company User</h1>
      <div className={styles.formGroup}>
        <form className={styles.form_form} onSubmit={handleSubmit}>
          <TextField
            id="filled-basic"
            label="Company name"
            variant="outlined"
            onChange={(e) => setcompName(e.target.value)}
          />

          <TextField
            id="filled-basic"
            label="Comapany Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            id="filled-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={(e) => setConfPass(e.target.value)}
          />
          <TextField
            id="filled-password-input"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={(e) => setPwd(e.target.value)}
          />

          <button className={styles.submitBtn}>Create User</button>
        </form>
      </div>
    </div>
  );
}
