import Button from "./UI/Button/Button";
import classes from "./UrlTable.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
const UrlTable = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  const removeHandler = () => {
    props.removeUrl(props.shortUrl);
  };
  return (
    <li className={classes.table}>
      <div className={classes.longUrl}>{props.longUrl}</div>
      <div className={classes.shortUrl}>{props.shortUrl}</div>
      <div>
        <CopyToClipboard text={props.shortUrl} onCopy={() => setIsCopied(true)}>
          <Button>Copy</Button>
        </CopyToClipboard>
        <Button onClick={removeHandler}>Remove</Button>
        {isCopied && <p>Copied!</p>}
      </div>
    </li>
  );
};

export default UrlTable;
