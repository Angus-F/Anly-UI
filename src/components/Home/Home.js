import classes from './Home.module.css';
import Card from '../UI/Card/Card';

const Home = () => {
    return (
      <Card className={classes.home}>
        <h1>Welcome to Anly!</h1>
      </Card>
    );
  };
  
  export default Home;
  