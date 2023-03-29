import Button from "./UI/Button/Button";
import Card from "./UI/Card/Card";
import Input from "./UI/Input/Input";
import classes from "./Shorten.module.css";
import { useState } from "react";
import useHttp from "../hooks/use-http";

const Shorten = () => {
  const [enteredUrl, setEnteredUrl] = useState("");
  const [enteredUrlIsValid, setEnteredUrlIsValid] = useState(true);
  const { isLoading, error, sendRequest, responseData } = useHttp();

  const isEmpty = (url) => {
    if (url.trim() === "") {
      return true;
    }
    return false;
  };

  const isAnlyUrl = (url) => {
    if (
      url.includes("http://localhost:8080/anly") ||
      url.includes("https://localhost:8080/anly/")
    ) {
      return true;
    }
    return false;
  };

  const formatUrl = (url) => {
    if (url.substr(0, 7) === "http://" || url.substr(0, 8) === "https://") {
      return url;
    }
    return "http://" + url;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (isEmpty(enteredUrl)) {
      setEnteredUrlIsValid(false);
      return;
    }
    const formattedUrl = formatUrl(enteredUrl);
    if (isAnlyUrl(formattedUrl)) {
      setEnteredUrlIsValid(false);
      return;
    }
    setEnteredUrlIsValid(true);

    sendRequest(
      {
        url: "http://localhost:8080/anly",
        mode: "no-cors",
        method: "POST",
        body: { longUrl: formattedUrl },
        headers: {
          "Content-Type": "text/plain",
        },
      },
      (data) => {
        for (const key in data) {
          return data[key];
        }
      }
    );
    if (!error) {
      setEnteredUrl(responseData);
    }
  };

  const urlChangeHandler = (event) => {
    setEnteredUrl(event.target.value);
  };
  return (
    <Card className={classes.main}>
      <form onSubmit={submitHandler}>
        <Input
          value={enteredUrl}
          type="text"
          id="longUrl"
          label="Shorten your link here:"
          onChange={urlChangeHandler}
        />
        {!enteredUrlIsValid && (
          <p className={classes["error-text"]}>Please provide a valid url!</p>
        )}
        {isLoading && <p>Loading...</p>}
        {error && <p className={classes["error-text"]}>{error}</p>}
        <div className={classes.actions}>
          <Button type="submit">Shorten</Button>
        </div>
      </form>
    </Card>
  );
};

export default Shorten;
