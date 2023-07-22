import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../assets/logonobg.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-white font-poppins">
      <div className="container mx-auto py-12 px-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-[18%] w-[18%] mr-2 " />
          </div>
          <div className="flex mt-4 md:mt-0 ml-0">
            <a href="/" className="mr-4 hover:text-white">
              Home
            </a>
            <a href="/about" className="mr-4 hover:text-white">
              About
            </a>
            <a href="/contact" className="mr-4 hover:text-white">
              Contact
            </a>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <a href="#" className="mr-4 hover:text-white">
              <FaFacebook />
            </a>
            <a href="#" className="mr-4 hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="text-sm mt-8 md:flex md:justify-between">
          <p className="mb-4 md:mb-0">© 2023 BiteSight. No rights reserved.</p>
          <p>
            Built with{" "}
            <a
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              React
            </a>{" "}
            and{" "}
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              Tailwind CSS
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
