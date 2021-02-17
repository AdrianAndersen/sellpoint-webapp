import { useState } from "react";
import styles from "../../styles/SignUpPage.module.css";

export default function SignUpCompany() {
  const [compName, setcompName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [confPassword, setConfPass] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitting Name ${compName}`);
  };
  return (
    <div className={styles.signUpCommpanywrapper}>
      <h1>Create Company User</h1>
      <div className={styles.formGroup}>
        <form className={styles.form_form} onSubmit={handleSubmit}>
          <input
            className={styles.inputForm}
            type="text"
            value={compName}
            placeholder="Company Name"
            onChange={(e) => setcompName(e.target.value)}
          />

          <input
            className={styles.inputForm}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.inputForm}
            type="password"
            value={password}
            onChange={(e) => setPwd(e.target.value)}
          />

          <input
            className={styles.inputForm}
            type="password"
            value={confPassword}
            onChange={(e) => setConfPass(e.target.value)}
          />

          <button className={styles.submitBtn}>Create User</button>
        </form>
      </div>
    </div>
  );
}
