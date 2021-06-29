import React from "react";
import { Link } from "react-router-dom";
import favicon from "../../styles/assets/twitter-logo-white.png";
// import "./leftNav.css";
import "./LeftNav.scss";
import Logout from "../Logout";
import Tweet from "../Tweet";

const LeftNav = () => {
  return (
    <div className="nav-container">
      <Link to="/home" className="nav-logo">
        <img src={favicon} alt="logo" style={{ width: "30px" }} />
      </Link>
      <Link to="/home" className="home-button">
        <h2>
          <i className="fa fa-home" aria-hidden="true" />{" "}
          <span className="title">Home</span>
        </h2>
      </Link>
      <Link to="/home" className="explore-button">
        <h2>
          <i className="fa fa-home" aria-hidden="true" />{" "}
          <span className="title">Explore</span>
        </h2>
      </Link>
      <Link to="/users" className="notifications-button">
        <h2>
          <i className="fa fa-bell" aria-hidden="true" />{" "}
          <span className="title">Notifications</span>
        </h2>
      </Link>
      <Link to="/users" className="messages-button">
        <h2>
          <i className="fa fa-envelope" aria-hidden="true" />{" "}
          <span className="title">Messages</span>
        </h2>
      </Link>
      <Link to="/home" className="bookmarks-button">
        <h2>
          <i className="fa fa-home" aria-hidden="true" />{" "}
          <span className="title">Bookmarks</span>
        </h2>
      </Link>
      <Link to="/home" className="lists-button">
        <h2>
          <i className="fa fa-home" aria-hidden="true" />{" "}
          <span className="title">Lists</span>
        </h2>
      </Link>
      <Link to="/profile" className="profile-button">
        <h2>
          <i className="fa fa-user" aria-hidden="true" />{" "}
          <span className="title">Profile</span>
        </h2>
      </Link>
      <Link to="/users" className="more-button">
        <h2>
          <i className="fa fa-ellipsis-h" aria-hidden="true" />{" "}
          <span className="title">More</span>
        </h2>
      </Link>
      <Tweet />
      <Logout />
    </div>
  );
};

export default LeftNav;
