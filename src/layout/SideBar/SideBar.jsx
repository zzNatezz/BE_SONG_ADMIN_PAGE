import React, { useContext } from "react";
import "./SideBar.scss";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/Context";

function SideBar() {
  const {setLoading} = useContext(AppContext)
  return (
    <div className="sidebar-container">
      <h2> General </h2>
      <div className="sidebar-home">
        <Link to="home">Home</Link>
      </div>
      <div className="sidebar-notice" onClick={() =>setLoading(true)}>
        <Link to="/notice">Notice</Link>
      </div>
    </div>
  );
}

export default SideBar;
