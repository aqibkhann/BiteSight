import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/Actions";
import close from "../assets/close.svg";
import menu from "../assets/menu.svg";
import logo from "../assets/logonobg.png";
import LoginCard from "./LoginCard";
import Loader from "./Loader";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const loggedIn = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    setIsLoginOpen(!isLoginOpen);
    setToggle(false);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await dispatch(logout());
      setLoading(false);
      history.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar px-6 fixed top-0 left-0 z-50">
      <img src={logo} alt="BiteSight" className="w-[165px] h-[72px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        <li className={`font-poppins font-normal cursor-pointer text-[20px] text-white mr-6`}>
          {loggedIn ? (
            location.pathname === "/dashboard" ? (
              <a href="/" className="text-white">Home</a>
            ) : (
              <a href="/dashboard" className="text-white">Dashboard</a>
            )
          ) : (
            <a href="/" className="text-white">Home</a>
          )}
        </li>
        <li className={`font-poppins font-normal cursor-pointer text-[20px] text-white mr-6`}>
          About Us
        </li>
        <li className={`font-poppins font-normal cursor-pointer text-[20px] text-white  mr-6`}>
          Contact
        </li>
        <li
          className={`font-poppins font-normal cursor-pointer text-[20px] ${loggedIn ? "text-red-500" : "text-gradient"
            } mr-6`}
          onClick={loggedIn ? handleLogout : handleLoginClick}
        >
          {loggedIn ? "Logout" : "Login"}
        </li>
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center relative z-50">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />
        {toggle && (
          <div className="absolute top-20 right-0 flex flex-col items-end bg-gradient-to-tl from-gray-900 via-gray-800 to-gray-700 p-8 rounded-xl z-50">
              {loggedIn && location.pathname === "/dashboard" ? <a href="/" className="text-white cursor-pointer mb-4"> Home </a>: <a href="/dashboard" className="text-white cursor-pointer mb-4"> Dashboard </a>}
            <a href="#" className="text-white cursor-pointer mb-4">
              About Us
            </a>
            <a href="#" className="text-white cursor-pointer mb-4">
              Contact
            </a>
            <a
              href="#"
              className={`cursor-pointer ${loggedIn ? "text-red-500" : "text-gradient"
                }`}
              onClick={loggedIn ? handleLogout : handleLoginClick}
            >
              {loggedIn ? "Logout" : "Login"}
            </a>
          </div>
        )}
      </div>

      {isLoginOpen && <LoginCard handleClose={() => setIsLoginOpen(false)} />}
    </nav>
  );
};

export default Navbar;
