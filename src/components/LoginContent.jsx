import React, { useState } from "react";
import { useSelector } from "react-redux";

const LoginContent = ({ onNewRegistrationClick, handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const loggedIn = useSelector((state) => state.user?.loggedIn);

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      await handleLogin(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <h2 className="text-xl font-poppins text-white mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-poppins mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-400 rounded"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-poppins mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-400 rounded"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="w-full font-poppins bg-blue-gradient text-white py-2 rounded hover:bg-blue-800 transition duration-200"
          type="submit"
        >
          Login
        </button>
        <button
          className="w-full font-poppins bg-blue-gradient text-white py-2 rounded hover:bg-blue-800 transition duration-200 mt-2"
          type="button"
          onClick={onNewRegistrationClick}
        >
          New Registration
        </button>
      </form>
      
      {error && (
        <p className="text-red-500 mt-2">{error}</p>
      )}
    </>
  );
};

export default LoginContent;
