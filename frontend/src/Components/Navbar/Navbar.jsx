import React, { useContext, useState } from "react";
import "./Navbar.css";
import { ShopContext } from "../../Context/ShopContext";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import profile from "../Assets/profile.jpeg";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [active, setActive] = useState("shop");
  const { getNumberOfItem , userProfile  } = useContext(ShopContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    // setCartItems(0); 
    navigate('/login');
  };
  return (
    <div className="flex justify-between bg-white text-black shadow-md mx-10">
      <div className="nav-logo flex mt-3 mb-2 mx-1 leading-normal cursor-pointer">
        <img src={logo} style={{ height: "60px", width: "60px" }} />
        <p className="mt-5 text-4xl font-bold">Manv</p>
      </div>
      <div className="flex-1">
        <ul className="flex gap-16 mt-8 font-serif justify-center items-center -ml-20 ">
          <li
            onClick={() => {
              setActive("shop");
            }}
          >
            <Link to="/">Shop</Link>
            {active === "shop" ? (
              <hr className="border-b-2 border-slate-600 mt-2" />
            ) : (
              <></>
            )}
          </li>
          <li
            onClick={() => {
              setActive("men");
            }}
          >
            <Link to="/men">Men</Link>
            {active === "men" ? (
              <hr className="border-b-2 border-slate-600 mt-2" />
            ) : (
              <></>
            )}
          </li>
          <li
            onClick={() => {
              setActive("women");
            }}
          >
            <Link to="/women">Women</Link>
            {active === "women" ? (
              <hr className="border-b-2 border-slate-600 mt-2" />
            ) : (
              <></>
            )}
          </li>
          <li
            onClick={() => {
              setActive("kids");
            }}
          >
            <Link to="/kids">Kids</Link>
            {active === "kids" ? (
              <hr className="border-b-2 border-slate-600 mt-2" />
            ) : (
              <></>
            )}
          </li>
        </ul>
      </div>
      {userProfile.admin && localStorage.getItem('auth-token') &&  (
        <Link to="/admin">
        <button className="flex mt-5 mr-2 bg-red-500 text-white rounded-full w-[130px] text-center justify-center px-10 py-2">Admin</button>
      </Link>
      )}

      <div className="flex mr-20 mt-6">
        <Link to="/cart">
          <img
            src={cart_icon}
            height={10}
            width={20}
            className="h-8 w-8 ml-2"
          />
        </Link>
        <span className="relative  mr-5 bg-red-500 text-white h-3.5 w-3.5 rounded-full text-[10px] flex justify-center items-center">
          {getNumberOfItem()}
        </span>
        {localStorage.getItem("auth-token") ? (
          <div
            className="relative"
            onMouseEnter={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(false)}
          >
            <img
              src={profile}
              className="h-12 w-12 rounded-full -mt-2"
              alt="Profile"
            />
            {dropdownVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="font-serif rounded-full border-2 border-slate-700 px-10 h-10 w-30 justify-center text-slate-700">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
