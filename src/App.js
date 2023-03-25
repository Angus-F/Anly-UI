import React from "react";
import MainHeader from "./components/MainHeader/MainHeader";
import Shorten from "./components/Shorten";

function App() {
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        <Shorten />
      </main>
    </React.Fragment>
  );
}

export default App;
