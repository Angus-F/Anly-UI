import classes from "./Navigation.module.css";
const Navigation = () => {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <button>Sign Up</button>
        </li>
        <li>
          <button>Sign In</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
