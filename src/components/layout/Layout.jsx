import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import style from "./layout.module.css";
const Layout = () => {
  return (
    <>
      <Header />
      <div className={style.body}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
