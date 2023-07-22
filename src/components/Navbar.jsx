import React from "react";
import { useState } from "react";
import close from "../assets/close.svg";
import menu from "../assets/menu.svg";
import logo from "../assets/logonobg.png";
import LoginCard from "./LoginCard";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logo} alt="BiteSight" className="w-[165px] h-[72px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        <li
          className={`font-poppins font-normal cursor-pointer text-[20px] text-white mr-6`}
        >
          Home
        </li>

        <li
          className={`font-poppins font-normal cursor-pointer text-[20px] text-white mr-6`}
        >
          About Us
        </li>

        <li
          className={`font-poppins font-normal cursor-pointer text-[20px] text-white  mr-6`}
        >
          Contact
        </li>
        <li
          className={`font-poppins font-normal cursor-pointer text-[20px] text-gradient  mr-6`}
          onClick={handleLoginClick}
        >
          Login
        </li>
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-8 bg-black-gradient absolute top-20 right-0 mx-4 my-6 min-w-[150px]
           rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            <li className="font-poppins font-medium cursor-pointer text-[16px] text-white ">
              <a href="#">Home</a>
            </li>
            <li className="font-poppins font-medium cursor-pointer text-[16px] text-white ">
              <a href="#">About Us</a>
            </li>
            <li className="font-poppins font-medium cursor-pointer text-[16px] text-white ">
              <a href="#">Contact</a>
            </li>
            <li
              className={`font-poppins font-medium cursor-pointer text-[16px] text-gradient`}
              onClick={handleLoginClick}
            >
              <a href="#">Login</a>
            </li>
          </ul>
        </div>
      </div>

      {isLoginOpen && <LoginCard handleClose={() => setIsLoginOpen(false)} />}
    </nav>
  );
};

export default Navbar;
