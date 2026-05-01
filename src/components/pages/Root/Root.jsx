import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const Root = () => {
  return (
    <div className="interFont">
      <Navbar></Navbar>
      <div className="pt-32">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
