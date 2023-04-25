import classes from "./Login.module.css";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";

const Login = () => {
  const ctx = useContext(AuthContext);
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(usernameInputRef.current.value, passwordInputRef.current.value);
  };
  return (
    <Card className={classes.login}>
      <h1 className={classes.title}>Login</h1>
      <form onSubmit={submitHandler}>
        <Input
          ref={usernameInputRef}
          type="text"
          id="username"
          label="Username"
        />
        <Input
          ref={passwordInputRef}
          type="password"
          id="password"
          label="Password"
        />
        {ctx.error && <p className={classes["error-text"]}>{ctx.error}</p>}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
          <Button onClick={ctx.onClose}>Cancel</Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
