import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

import classes from "./LoginForm.module.scss";
import usernameIcon from "../../assets/akar-icons_person.svg";
import passwordIcon from "../../assets/carbon_password.svg";
import { checkInput } from "./checkInput";


function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordInputRef = useRef();
  const isLoading = useSelector((state) => state.admin.isLoading);
  const errorLoginApi = useSelector((state) => state.admin.errorMessage);
  const isLogin = useSelector((state) => state.admin.isLogin);
  const [errorInput, setErrorInput] = useState("");

  const handleLoginBtnClick = () => {
  };

  return (
    <div className={classes.form}>
      <div>
        <img
          className={classes.icon}
          src={usernameIcon}
          alt="Username icon"
          htmlFor="user-name"
        ></img>
        <input
          className={classes.input}
          type="email"
          id="email"
          autoComplete="on"
          placeholder="Email"
          ref={emailRef}
        ></input>
      </div>

      <div>
        <img
          className={classes.icon}
          src={passwordIcon}
          alt="Password icon"
          htmlFor="user-password"
        ></img>
        <input
          className={classes.input}
          type="password"
          id="user-password"
          name="user-password"
          autoComplete="off"
          placeholder="Password"
          ref={passwordInputRef}
        ></input>
      </div>
      <div className={classes.error}>
        {isLoading ? (
          <Spin />
        ) : (
          <span>{errorInput === "" ? errorLoginApi : errorInput}</span>
        )}
      </div>
      <button
        type="type"
        className={classes.loginBtn}
        onClick={handleLoginBtnClick}
      >
        Login
      </button>
    </div>
  );
}

export default LoginForm;
