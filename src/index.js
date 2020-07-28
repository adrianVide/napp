import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Main } from "./components/main/Main";
import { Nav } from "./components/nav/Nav";
import { Worker } from "./components/worker/Worker";

ReactDOM.render(
  <React.StrictMode>
  <Nav />
    <Router>
      <Route exact path='/' component={Main} />
      <Route exact path='/:id' component={Worker} />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);


serviceWorker.unregister();
