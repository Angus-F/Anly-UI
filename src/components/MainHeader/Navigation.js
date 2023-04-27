import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Navigation.module.css";
const Navigation = () => {
  const ctx = useContext(AuthContext);
  let content = null;
  if (ctx.isLoggedIn) {
    content = (
      <ul>
        <li>
          <button onClick={ctx.onLogout}>Logout</button>
        </li>
      </ul>
    );
  } else {
    content = (
      <ul>
        <li>
          <button onClick={ctx.onShowSignUpPage}>Sign Up</button>
        </li>
        <li>
          <button onClick={ctx.onShowLoginPage}>Login</button>
        </li>
      </ul>
    );
  }
  return <nav className={classes.nav}>{content}</nav>;
};

export default Navigation;
