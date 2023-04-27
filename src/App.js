import React, { useContext } from "react";
import MainHeader from "./components/MainHeader/MainHeader";
import Home from "./components/Home/Home";
import AuthContext from "./store/auth-context";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Shorten from "./components/Shorten/Shorten";

function App() {
  const ctx = useContext(AuthContext);
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {ctx.pageToShow.signUp && <SignUp />}
        {ctx.pageToShow.login && <Login />}
        {ctx.isLoggedIn && <Shorten />}
        {!ctx.isLoggedIn && !ctx.pageToShow.signUp && !ctx.pageToShow.login && (
          <Home />
        )}
      </main>
    </React.Fragment>
  );
}

export default App;
