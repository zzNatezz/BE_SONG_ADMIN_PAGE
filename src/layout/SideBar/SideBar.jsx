import React, { useContext } from "react";
import "./SideBar.scss";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/Context";

function SideBar() {
  const {setLoading,handleLogout} = useContext(AppContext)
  return (
    <div className="sidebar-container">
      <h2> General </h2>
      <div className="sidebar-home">
        <Link to="home">Home</Link>
      </div>
      <div className="sidebar-notice" onClick={() =>setLoading(true)}>
        <Link to="/notice">Notice</Link>
      </div>
      <div className="sidebar-management">
        <Link to="/management">Management</Link>
      </div>
      <button onClick={() => handleLogout()} className="btn-logout"> Log Out </button>
    </div>
  );
}

export default SideBar;
