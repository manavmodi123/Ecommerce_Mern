import React from "react";
import logo from "../assets/logo.png";
import navProfile from "../assets/nav-profile.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between bg-white text-black shadow-md px-10 ">
      <div className="nav-logo flex mt-3 mb-2 mx-8 leading-normal cursor-pointer">
        <img src={logo} style={{ height: "80px", width: "70px" }} />
        <div className="ml-2 mt-2">
          <p className="mt-1 text-4xl font-bold font-sans">Manv</p>
          <p className="text-red-500 font-sans">Admin Panel</p>
        </div>
      </div>
      <div className="flex">
      <Link to="/redirect">
      <img src={logo} style={{ height: "40px", width: "35px" }} className="mt-8 mr-5" />
      </Link>
      
      <img
        src={navProfile}
        alt="Profile Logo"
        className="mt-3 right"
        style={{ height: "80px", width: "90px" }}
      />
      </div>
    </div>
  );
};

export default Navbar;
