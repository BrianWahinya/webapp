import { useState, useEffect } from "react";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [usernameValid, setUsernameValid] = useState(false);
  const [passValid, setPassValid] = useState(false);
  const [matchValid, setMatchValid] = useState(false);

  const [focusItem, setFocusItem] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.;]).{8,24}$/;

  useEffect(() => {
    const unameResult = USER_REGEX.test(username);
    console.log("unameResult", unameResult);
    console.log("username", username);
    setUsernameValid(unameResult);
  }, [username]);

  useEffect(() => {
    const passResult = PWD_REGEX.test(password);
    console.log("passResult", passResult);
    console.log("password", password);
    setPassValid(passResult);
    const match = password === matchPassword;
    setMatchValid(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, matchPassword]);

  const changeInputVal = (e) => {
    const inputName = e.target.id;
    const inputValue = e.target.value;
    switch (inputName) {
      case "username":
        setUsername(inputValue);
        break;
      case "email":
        setEmail(inputValue);
        break;
      case "password":
        setPassword(inputValue);
        break;
      case "match_password":
        setMatchPassword(inputValue);
        break;
      default:
        return;
    }
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const uname = USER_REGEX.test(username);
    const pwd = PWD_REGEX.test(password);
    if (!uname || !pwd) {
      setErrMsg("Username or Password Invalid");
      return;
    }
    localStorage.setItem(
      "userdetails_bwp",
      JSON.stringify({ username, password }),
    );
    setSuccess(true);
  };
  const showHidePassword = (e) => {
    e.preventDefault();
    setFocusItem("");
    setShowPassword(!showPassword);
  };
  const checkOnFocus = (e) => {
    // e.preventDefault();
    setFocusItem(e.target.id);
  };
  const checkOnBlur = (e) => {
    // e.preventDefault();
    setFocusItem("");
  };
  return success ? (
    <p>Success. Go to Login</p>
  ) : (
    <section id="sectionRegister">
      <h5>Register</h5>
      <p className={errMsg ? "showElem" : "hideElem"} aria-live="assertive">
        {errMsg}
      </p>
      <form className="formRegister" onSubmit={submitForm}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={changeInputVal}
          onFocus={checkOnFocus}
          onBlur={checkOnBlur}
          autoComplete="off"
          required
          aria-invalid={usernameValid ? "false" : "true"}
          aria-describedby="uidnote"
        />
        <p
          id="uidnote"
          className={
            focusItem === "username" && username && !usernameValid
              ? "showElem"
              : "hideElem"
          }
        >
          4-24 characters
          <br /> Must begin with a letter
          <br /> Letters, numbers, hyphen or underscores allowed
        </p>

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={changeInputVal}
        />

        <label htmlFor="password">Password: </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={changeInputVal}
          onFocus={checkOnFocus}
          onBlur={checkOnBlur}
          autoComplete="off"
          required
          aria-invalid={passValid ? "false" : "true"}
          aria-describedby="passnote"
        />
        <p
          id="passnote"
          className={
            focusItem === "password" && password && !passValid
              ? "showElem"
              : "hideElem"
          }
        >
          8-24 characters
          <br /> Must include A-Z, a-z, 0-9 or a special character !@#$%.;
        </p>

        <label htmlFor="match_password">Re-enter password: </label>
        <input
          type={showPassword ? "text" : "password"}
          id="match_password"
          value={matchPassword}
          onChange={changeInputVal}
          onFocus={checkOnFocus}
          onBlur={checkOnBlur}
          autoComplete="off"
          required
          aria-invalid={matchValid ? "false" : "true"}
          aria-describedby="matchnote"
        />

        <p
          id="matchnote"
          className={
            focusItem === "match_password" && password && !matchValid
              ? "showElem"
              : "hideElem"
          }
        >
          Passwords dont match
        </p>

        <button
          id="showPassword"
          className="btn btn-sm btn-success btnShowPassword"
          onClick={showHidePassword}
          onFocus={checkOnFocus}
          onBlur={checkOnBlur}
        >
          {showPassword ? "Hide" : "Show"} Password
        </button>
        <button
          className="btn btn-sm btn-primary btnRegister"
          disabled={matchValid && usernameValid && passValid ? false : true}
        >
          Register
        </button>
      </form>
      <p className="alreadyRegistered">Already registered? Login</p>
    </section>
  );
}
