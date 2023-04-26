import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const AuthContext = React.createContext({
  isLoggedIn: false,
  pageToShow: null,
  onLogout: () => {},
  onLogin: (username, password) => {},
  onSignUp: (username, password) => {},
  onClose: () => {},
  onShowSignUpPage: () => {},
  onShowLoginPage: () => {},
  responseData: null,
  error: null,
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pageToShow, setPageToShow] = useState({ login: false, signUp: false });

  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const anlyRegisterUrl = "http://localhost:8080/register";
  const anlyLoginUrl = "http://localhost:8080/login";

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (username, password) => {
    axios({
      method: "POST",
      url: anlyLoginUrl,
      data: {
        password: password,
        username: username,
      },
    })
      .then((response) => {
        setResponseData(response.data);
        setError(null);
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setIsLoggedIn(true);
        setPageToShow({ login: false, signUp: false });
        localStorage.setItem("isLoggedIn", "1");
      })
      .catch((err) => {
        setError(err.response.data);
        setResponseData(null);
        console.log(err);
      });
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setPageToShow({ login: false, signUp: false });
  };

  const signUpHandler = (username, password) => {
    axios({
      method: "POST",
      url: anlyRegisterUrl,
      data: {
        password: password,
        username: username,
      },
    })
      .then((response) => {
        setResponseData(response.data);
        setError(null);
        console.log(response.data);
      })
      .catch((err) => {
        setError(err.response.data);
        setResponseData(null);
        console.log(err);
      });
  };

  const showLoginPageHandler = () => {
    setResponseData(null);
    setError(null);
    setPageToShow({ login: true, signUp: false });
  };

  const showSignUpPageHandler = () => {
    setResponseData(null);
    setError(null);
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
        responseData: responseData,
        error: error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
