import React, { useEffect } from "react";


import Layout from "components/Layout/Layout";
import Header from "./Layout/Header/Header";
import Sidebar from "./Layout/Sidebar/Sidebar";

import "./Admin.scss";

const Admin = ({ children }) => {
  useEffect(() => {
    document.body.classList.add("is-admin");
    return () => {
      document.body.classList.remove("is-admin");
    };
  }, []);

  return (
    <>
      <div className="app-admin">
        <Header />
        <Layout className="app-admin-content-main">
          <Sidebar />
          <div className="app-admin-content-main-inner">{children}</div>
        </Layout>
      </div>
    </>
  );
};

export default Admin;
