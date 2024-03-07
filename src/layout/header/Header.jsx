import React from "react";
import Icon from "../../assets/svg/Icon";
import './Header.scss'
import image from "../../assets/png/image";
const Header = () => {
  return (
    <div className="header-container">
      <div className="left-header">
        <img  src={image.mainLogo} alt="logo_stave" />
        <h1>STAVE - ADMIN ROLE</h1>
      </div>
      <div className="right-header">
        <img src={Icon.bell} alt="bell_icon" />
        <img src={Icon.envelop} alt="envelop_icon" />
      </div>
    </div>
  );
};

export default Header;
