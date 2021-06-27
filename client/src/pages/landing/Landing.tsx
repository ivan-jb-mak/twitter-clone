import React, { useState } from "react";
import { Link } from "react-router-dom";
import twitterLogo from "../../styles/assets/twitter-logo-white.png";
import "./Landing.scss";
import SignupModal from "../../components/signupModal/SignupModal";

const Landing = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

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
            <Link to="/" onClick={openModal} className="signup-btn">
              Sign up
            </Link>
            <Link to="/login" className="login-btn">
              Log in
            </Link>
            <SignupModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
