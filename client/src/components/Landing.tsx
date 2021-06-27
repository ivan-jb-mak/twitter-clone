import React from "react";
import { Link } from "react-router-dom";
import twitterLogo from "../styles/assets/twitter-logo-white.png";
// import "../styles/landing.css";
import "../scss/pages/Landing.scss";
import SignupModal from "../pages/SignupModal";

const Landing = () => {
  return (
    <div className="main">
      <div className="left"></div>
      <div className="right">
        <div className="wrapper">
          <Link to="/">
            <img src={twitterLogo} alt="twitter-logo" className="logo" />
          </Link>
          <h1 className="main-heading">Happening now</h1>
          <span className="sub-heading">Join Twitter today.</span>
          <div className="buttons">
            <Link to="/signup" className="signup-btn">
              Sign up
            </Link>
            <Link to="/login" className="login-btn">
              Log in
            </Link>

            <SignupModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
