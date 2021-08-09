import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
import News from "./News";
import { Menu } from "./Menu";
import { Comments } from "./Comments";

const App = () => {
  return (
    <>
      <HashRouter>
        <Menu />
        <Switch>
          <Route path="/newest">
            <News cat="newest" />
          </Route>
          <Route path="/comment/:id">
            <Comments />
          </Route>
          <Route path="/">
            <News cat="news" />
          </Route>
        </Switch>
      </HashRouter>
    </>
  );
};

export default App;
