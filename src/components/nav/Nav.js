import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div className="container">
      <div className="navbar">
        <a href="/">
          <img
            className="logo"
            src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/logo-umpa-loompa.png"
            alt="logo"
          />
        </a>
        Oompa Loompa's Crew
      </div>
    </div>
  );
};
