import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import close from "../assets/close.svg";
import LoginContent from "./LoginContent";
import Registration from "./Registration";
import Loader from "./Loader";
import { login } from "../redux/Actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const LoginCard = ({ handleClose }) => {
  const [isRegistration, setIsRegistration] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.loggedIn);
  const history = useHistory();

  const handleNewRegistrationClick = () => {
    setIsRegistration(true);
  };

  const handleLogin = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      const response = await dispatch(login(email, password));
      setLoading(false);
      history.push('/dashboard');
      if (response && response.status === 404) {
        setError(`User doesn't exist. Please create an account to continue.`);
      } else if (response && response.status === 401) {
        setError(`Invalid credentials.`);
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      setError("An error occurred while logging in. Please try again later.");
    }
  };

  if (loggedIn) {
    return null;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-full max-w-md bg-primary rounded-lg p-8 relative">
        <div className="flex justify-end">
          <img
            src={close}
            alt="close"
            className="w-[24px] h-[24px] cursor-pointer"
            onClick={handleClose}
          />
        </div>
        {isRegistration ? (
          <Registration />
        ) : (
          <React.Fragment>
            <LoginContent
              onNewRegistrationClick={handleNewRegistrationClick}
              handleLogin={handleLogin}
            />
            {error && (
              <div className="text-red-400 text-md mt-2">{error}</div>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default LoginCard;
