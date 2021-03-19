import React, { useState } from "react";

import PagesIcon from "@material-ui/icons/Pages";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import UsersGroupIcon from "@material-ui/icons/Group";

import NavLink from "components/NavLink/NavLink";

import "./Sidebar.scss";
import Button from "components/Button/Button";

const Pages = [
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
  const [openCloapse, setOpenCloapse] = useState({
    settings: [
      { id: 1, open: false },
      { id: 2, open: false },
    ],
  });

  const handleOpenCloapseClick = (id) => {
    setOpenCloapse({
      ...openCloapse,
      settings: openCloapse.settings.map((item) =>
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
        <ul className="app-admin-sidebar__nav-lsit">
          <li className="app-admin-sidebar__nav-item">
            <Button
              className={`app-admin-sidebar__nav-link ${openCloapse.settings.find((item) => item.id === 1).open
                ? "is-active"
                : ""
                }`}
              onClick={(e) => {
                handleOpenCloapseClick(1);
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
              className={`app-admin-sidebar__nav-lsit first-level ${!openCloapse.settings.find((item) => item.id === 1).open
                ? "expanded"
                : "collapsed"
                }`}
            >
              {Pages.map((el, index) => {
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
              className={`app-admin-sidebar__nav-link ${openCloapse.settings.find((item) => item.id === 2).open
                ? "is-active"
                : ""
                }`}
              onClick={(e) => {
                handleOpenCloapseClick(2);
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
              className={`app-admin-sidebar__nav-lsit first-level ${!openCloapse.settings.find((item) => item.id === 2).open
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
