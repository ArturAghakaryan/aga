import React from "react";

import Header from "containers/Main/Layout/Header/Header";
import Layout from "components/Layout/Layout";
import Footer from "containers/Main/Layout/Footer/Footer";

const Main = ({ children }) => {
  return (
    <>
      <Header />
      <Layout>{children}</Layout>
      <Footer />
    </>
  );
};

export default Main;
