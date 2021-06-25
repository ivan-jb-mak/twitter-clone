import React from "react";
import { Link } from "react-router-dom";
// import twitterLogo from "../styles/assets/twitter-logo.png";
import twitterLogo from "../styles/assets/twitter-logo-white.png";
import "../styles/landing.css";

const Landing = () => {
  return (
    <div className="main">
      <div className="wrapper">
        <div className="left"></div>

        <div className="center">
          <Link to="/">
            <img
              src={twitterLogo}
              alt="twitter-logo"
              style={{ width: "50px" }}
              className="logo"
            />
          </Link>
          <h1 className="main-heading">Happening now</h1>
          <span className="sub-heading">Join Twitter today.</span>
          <div className="buttons">
            <Link to="/signup" className="btn-sign-up">
              Sign up
            </Link>
            <Link to="/login" className="btn-login">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
