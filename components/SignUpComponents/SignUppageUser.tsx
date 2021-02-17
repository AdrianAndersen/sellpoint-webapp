import { useState } from "react";
import styles from "../../styles/SignUpPage.module.css";

export default function SignUpPerson() {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [confPassword, setConfPass] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitting Name ${fullName}`);
  };

  return (
    <div className={styles.signUpPersonwrapper}>
      <h1>Create User</h1>
      <div className={styles.formGroup}>
        <form className={styles.form_form} onSubmit={handleSubmit}>
          <input
            className={styles.inputForm}
            type="text"
            value={fullName}
            placeholder="Full name"
            onChange={(e) => setfullName(e.target.value)}
          />

          <input
            className={styles.inputForm}
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.inputForm}
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPwd(e.target.value)}
          />

          <input
            className={styles.inputForm}
            type="password"
            value={confPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfPass(e.target.value)}
          />

          <button className={styles.submitBtn}>Create User</button>
        </form>
      </div>
    </div>
  );
}
