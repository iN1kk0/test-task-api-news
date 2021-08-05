import React from "react";
import "../styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import News from "./News";
import Newest from "./Newest";
import { Menu } from "./Menu";

const App = () => {
  return (
    <>
      <Router>
        <Menu />
        <Switch>
          <Route path="/newest">
            <Newest />
          </Route>
          <Route path="/">
            <News />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
