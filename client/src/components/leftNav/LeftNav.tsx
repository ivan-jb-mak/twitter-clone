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
        <div>
          <i className="fa fa-home" aria-hidden="true" />{" "}
          <span className="title">Home</span>
        </div>
      </Link>
      <Link to="/home" className="explore-button">
        <div>
          <i className="fa fa-home" aria-hidden="true" />{" "}
          <span className="title">Explore</span>
        </div>
      </Link>
      <Link to="/users" className="notifications-button">
        <div>
          <i className="fa fa-bell" aria-hidden="true" />{" "}
          <span className="title">Notifications</span>
        </div>
      </Link>
      <Link to="/users" className="messages-button">
        <div>
          <i className="fa fa-envelope" aria-hidden="true" />{" "}
          <span className="title">Messages</span>
        </div>
      </Link>
      <Link to="/home" className="bookmarks-button">
        <div>
          <i className="fa fa-home" aria-hidden="true" />{" "}
          <span className="title">Bookmarks</span>
        </div>
      </Link>
      <Link to="/home" className="lists-button">
        <div>
          <i className="fa fa-home" aria-hidden="true" />{" "}
          <span className="title">Lists</span>
        </div>
      </Link>
      <Link to="/profile" className="profile-button">
        <div>
          <i className="fa fa-user" aria-hidden="true" />{" "}
          <span className="title">Profile</span>
        </div>
      </Link>
      <Link to="/users" className="more-button">
        <div>
          <i className="fa fa-ellipsis-h" aria-hidden="true" />{" "}
          <span className="title">More</span>
        </div>
      </Link>
      <Tweet />
      <Logout />
    </div>
  );
};

export default LeftNav;
