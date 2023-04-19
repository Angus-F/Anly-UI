import classes from "./SignUp.module.css";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { useContext, useState, useRef } from "react";
import AuthContext from "../../store/auth-context";

const SignUp = () => {
  const ctx = useContext(AuthContext);
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const usernameInValid =
      usernameInputRef.current.value.includes("admin") ||
      usernameInputRef.current.value.trim().length < 6;
    const passwordInValid = passwordInputRef.current.value.trim().length < 6;
    if (usernameInValid) {
      setIsUsernameValid(false);
    } else {
      setIsUsernameValid(true);
    }
    if (passwordInValid) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
    if (!usernameInValid && !passwordInValid) {
      setIsUsernameValid(true);
      setIsPasswordValid(true);
      ctx.onSignUp(
        usernameInputRef.current.value,
        passwordInputRef.current.value
      );
    }
  };
  return (
    <Card className={classes.signup}>
      <h1 className={classes.title}>Sign Up Now!</h1>
      <form onSubmit={submitHandler}>
        <Input
          ref={usernameInputRef}
          type="text"
          id="username"
          label="Username"
          isValid={isUsernameValid}
        />
        <Input
          ref={passwordInputRef}
          type="password"
          id="password"
          label="Password"
          isValid={isPasswordValid}
        />
        {!isUsernameValid && (
          <p className={classes["error-text"]}>
            Please provide a valid username! Username should not include "admin"
            and should be longer than 5
          </p>
        )}
        {!isPasswordValid && (
          <p className={classes["error-text"]}>
            Please provide a valid password! Password should be longer than 5
          </p>
        )}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Sign up
          </Button>
          <Button onClick={ctx.onClose}>Cancel</Button>
        </div>
      </form>
    </Card>
  );
};

export default SignUp;
