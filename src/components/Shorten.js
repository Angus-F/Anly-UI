import Button from "./UI/Button/Button";
import Card from "./UI/Card/Card";
import Input from "./UI/Input/Input";
import classes from "./Shorten.module.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import UrlTable from "./UrlTable";

const anlyLongToShortUrl = "http://localhost:8080/longToShort";
const encodeMethod = "random2";
const Shorten = () => {
  const [enteredUrlIsValid, setEnteredUrlIsValid] = useState(true);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [availableUrls, setAvailableUrls] = useState([]);
  const inputRef = useRef();

  const isEmpty = (url) => {
    if (url.trim() === "") {
      return true;
    }
    return false;
  };

  const isAnlyUrl = (url) => {
    if (
      url.includes("http://localhost:8080") ||
      url.includes("https://localhost:8080")
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

  useEffect(() => {
    console.log(responseData);
    if (responseData) {
      inputRef.current.value = responseData.shortUrl;
      let urls = null;
      if (localStorage.getItem("urlTable") === null) {
        urls = [responseData];
      } else {
        urls = JSON.parse(localStorage.getItem("urlTable"));
        urls = urls.filter((url) => url.longUrl !== responseData.longUrl);
        urls = [responseData, ...urls];
      }
      localStorage.setItem("urlTable", JSON.stringify(urls));
      setAvailableUrls(urls);
    }
  }, [responseData]);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredUrl = inputRef.current.value;
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

    setError(null);
    setIsLoading(true);
    let nextId = 0;
    if (localStorage.getItem("urlId") === null) {
      localStorage.setItem("urlId", "0");
    } else {
      nextId = parseInt(localStorage.getItem("urlId")) + 1;
      localStorage.setItem("urlId", nextId.toString());
    }
    axios({
      method: "POST",
      url: anlyLongToShortUrl,
      data: {
        id: nextId,
        longUrl: formattedUrl,
        shotUrl: "",
        encode: encodeMethod,
      },
    })
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      });
    setIsLoading(false);
  };

  const removeUrl = (shortUrl) => {
    let urls = JSON.parse(localStorage.getItem("urlTable"));
    urls = urls.filter((url) => url.shortUrl !== shortUrl);
    localStorage.setItem("urlTable", JSON.stringify(urls));
    setAvailableUrls(urls);
  };

  const availableUrlsToShow = availableUrls.map((url) => (
    <UrlTable
      removeUrl={removeUrl}
      key={url.id}
      shortUrl={url.shortUrl}
      longUrl={url.longUrl}
    />
  ));

  return (
    <Card className={classes.main}>
      <form onSubmit={submitHandler}>
        <Input
          ref={inputRef}
          type="text"
          id="longUrl"
          label="Shorten your link here:"
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
      <ul>{availableUrlsToShow}</ul>
    </Card>
  );
};

export default Shorten;
