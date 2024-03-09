import React from "react";
import "./SideBar.scss";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="sidebar-container">
      <h2> General </h2>
      <div className="sidebar-home">
        <Link to="home">Home</Link>
      </div>
      <div className="sidebar-notice">
        <Link to="/notice">Notice</Link>
      </div>
    </div>
  );
}

export default SideBar;
