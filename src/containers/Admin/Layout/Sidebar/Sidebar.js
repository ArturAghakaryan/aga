import React, { useState } from "react";

import PagesIcon from "@material-ui/icons/Pages";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import UsersGroupIcon from "@material-ui/icons/Group";

import Button from "components/Button/Button";
import NavLink from "components/NavLink/NavLink";

import "./Sidebar.scss";

const adminPages = [
  {
    to: "/admin/posts",
    title: "Posts"
  },
  {
    to: "/admin/todos",
    title: "Todos"
  }
]

const Sidebar = () => {
  const [openCollapse, setOpenCollapse] = useState({
    settings: [
      { id: 1, open: false },
      { id: 2, open: false },
    ],
  });

  const handleOpenCollapseClick = (id) => {
    setOpenCollapse({
      ...openCollapse,
      settings: openCollapse.settings.map((item) =>
        item.id === id
          ? { ...item, open: !item.open }
          : { ...item, open: false }
      ),
    });
  };

  return (
    <div className="app-admin-sidebar">
      <div className="app-admin-sidebar__user"></div>

      <div className="app-admin-sidebar__nav">
        <ul className="app-admin-sidebar__nav-list">
          <li className="app-admin-sidebar__nav-item">
            <Button
              className={`app-admin-sidebar__nav-link ${openCollapse.settings.find((item) => item.id === 1).open
                ? "is-active"
                : ""
                }`}
              onClick={(e) => {
                handleOpenCollapseClick(1);
              }}
            >
              <span className="icon-nav">
                <PagesIcon />
              </span>
              <span className="nav-link-title">Pages</span>
              <span className="icon-arrow-forward">
                <ArrowForwardIosIcon />
              </span>
            </Button>
            <ul
              className={`app-admin-sidebar__nav-list first-level ${!openCollapse.settings.find((item) => item.id === 1).open
                ? "expanded"
                : "collapsed"
                }`}
            >
              {adminPages.map((el, index) => {
                return (
                  <li key={index} className="app-admin-sidebar__nav-item" >
                    <NavLink to={el.to} className="app-admin-sidebar__nav-link">
                      {el.title}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </li>
          <li className="app-admin-sidebar__nav-item">
            <Button
              className={`app-admin-sidebar__nav-link ${openCollapse.settings.find((item) => item.id === 2).open
                ? "is-active"
                : ""
                }`}
              onClick={(e) => {
                handleOpenCollapseClick(2);
              }}
            >
              <span className="icon-nav">
                <UsersGroupIcon />
              </span>
              <span className="nav-link-title">Users</span>
              <span className="icon-arrow-forward">
                <ArrowForwardIosIcon />
              </span>
            </Button>
            <ul
              className={`app-admin-sidebar__nav-list first-level ${!openCollapse.settings.find((item) => item.id === 2).open
                ? "expanded"
                : "collapsed"
                }`}
            >
              <li className="app-admin-sidebar__nav-item">
                <NavLink
                  to="/admin/users"
                  className="app-admin-sidebar__nav-link"
                >
                  Users
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div >
  );
};

export default Sidebar;
