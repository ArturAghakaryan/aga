import React from "react";

import { useLocation } from "react-router-dom";

import Logo from "./Logo/Logo";
import Navigation from "./Navigation/Navigation";

import "./Header.scss";

const Header = () => {
  const location = useLocation();
 
  return (
    <header className={`hedaer-main ${location.pathname === '/' ? 'is-sticky': ''}`}>
      <div className="container">
        <div className="header-main-content">
          <Logo url="/" />
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
