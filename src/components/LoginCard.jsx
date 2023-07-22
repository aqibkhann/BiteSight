import React from "react";
import close from "../assets/close.svg";
import LoginContent from "./LoginContent";

const LoginCard = ({ handleClose }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-full max-w-md bg-primary rounded-lg p-8">
        <div className="flex justify-end">
          <img
            src={close}
            alt="close"
            className="w-[24px] h-[24px] cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <LoginContent />
      </div>
    </div>
  );
};

export default LoginCard;
