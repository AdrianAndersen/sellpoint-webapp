import Button from "@material-ui/core/Button";
import React from "react";
import styles from "../styles/Login2.module.css";
import { useState } from "react";

export default function LoginForm() {
  // const classes = useStyles();
  //<button>LogIn</button>
  return (
    <div className={styles.loginForm}>
      <form>
        <h1>Login</h1>
        <div className={styles.formGroup}>
          <input type="email" name="email" placeholder="E-mail Address" />
          <span className="input-icon">
            <i className="fa fa-envelope"></i>
          </span>
        </div>
        <div className={styles.formGroup}>
          <input type="password" name="psw" placeholder="Password" />
          <span className="input-icon">
            <i className="fa fa-lock"></i>
          </span>
        </div>
        <button className={styles.loginBtn}>Login</button>

        <div className={styles.seperator}>
          <b>or</b>
        </div>
        <div>
          <p>Sign up</p>
        </div>
      </form>
    </div>
  );
}
