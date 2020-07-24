import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
// import App from './App';
import * as serviceWorker from "./serviceWorker";
import { Main } from "./components/main/Main";
import { Worker } from "./components/worker/Worker";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path='/' component={Main} />
      <Route exact path='/:id' component={Worker} />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
