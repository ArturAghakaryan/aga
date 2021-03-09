import React from "react";

import { NavLink as RoterNavLink } from "react-router-dom";

import './NavLink.scss'

const NavLink = ({ to, className = "", children }) => {
  return (
    <RoterNavLink exact activeClassName="is-active" to={to} className={`nav-link ${className}`}>
      {children}
    </RoterNavLink>
  );
};

export default NavLink;
