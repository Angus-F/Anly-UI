import React, { useEffect } from "react";
import { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  pageToShow: null,
  onLogout: () => {},
  onLogin: (username, password) => {},
  onSignUp: (username, password) => {},
  onClose: () => {},
  onShowSignUpPage: () => {},
  onShowLoginPage: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pageToShow, setPageToShow] = useState({ login: false, signUp: false });

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (username, password) => {
    //To do
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
    setPageToShow({ login: false, signUp: false });
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setPageToShow({ login: false, signUp: false });
  };

  const signUpHandler = (username, password) => {};

  const showLoginPageHandler = () => {
    setPageToShow({ login: true, signUp: false });
  };

  const showSignUpPageHandler = () => {
    setPageToShow({ login: false, signUp: true });
  };

  const closeHandler = () => {
    setPageToShow({ login: false, signUp: false });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        pageToShow: pageToShow,
        onSignUp: signUpHandler,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onClose: closeHandler,
        onShowLoginPage: showLoginPageHandler,
        onShowSignUpPage: showSignUpPageHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
