import classes from "./Table.module.css";
const Table = (props) => {
  return (
    <li className={classes.table}>
      <div className={classes.longUrl}>{props.longUrl}</div>
      <div className={classes.shortUrl}>{props.shortUrl}</div>
    </li>
  );
};

export default Table;
