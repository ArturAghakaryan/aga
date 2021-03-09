import React, { Component } from "react";

import NavLink from "components/NavLink/NavLink";

import "./Navigation.scss";

class Navigation extends Component {
  render() {
    return (
      <div className="main-navigation">
        <ul className="main-navigation-list">
          <li className="nav-item">
            <NavLink to="/" className={`nav-item-link`}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/posts" className={`nav-item-link`}>
              Posts
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/todos" className={`nav-item-link`}>
              Todos
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navigation;
