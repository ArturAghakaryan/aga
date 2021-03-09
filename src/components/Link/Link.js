import React from "react";

import { Link as RouterLink } from "react-router-dom";

import './Link.scss'

const Link = ({ children, to, className = "" ,target=""}) => {
  return (
    <RouterLink to={to} className={`app-link ${className}`} target={target}>
      {children}
    </RouterLink>
  );
};

export default Link;
