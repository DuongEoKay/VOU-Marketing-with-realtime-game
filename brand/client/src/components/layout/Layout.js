import React, { Fragment } from "react";
import Header from "./Header";

const Layout = ({ children, isAdmin = false, isHomePage = false }) => {
  return (
    <Fragment>
      <Header isAdmin={isAdmin} isHomePage={isHomePage}></Header>
      {children}
    </Fragment>
  );
};

export default Layout;
