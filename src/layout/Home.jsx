import React from "react";
import SideBar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import "./Home.scss";

function Home() {
  return (
    <div className="home-container">
      <div className="home-header">
        <Header />
      </div>
      <div className="home-body">
        <SideBar />
        <section className="home-section">
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export default Home;
