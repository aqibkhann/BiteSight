import React, { useState } from "react";
import axios from "axios";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "", // Initialize gender as an empty string
    age: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleChange = (e) => {
    const { id, value } = e.target;
    
    // Special case for radio buttons
    if (e.target.type === "radio") {
      setFormData({ ...formData, gender: value });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3001/api/register`, {
        name: formData.username,
        email: formData.email,
        password: formData.confirmPassword,
        gender: formData.gender,
        age: formData.age
      });

      console.log("User registered successfully:", response.data.user);
      setSuccessMessage("User registered successfully. Log in again."); // Set success message
      setErrorMessage(""); // Clear any previous error messages

    } catch (error) {
      console.error("Error registering user:", error.response.data.message);
      setErrorMessage(error.response.data.message);
      setSuccessMessage(""); // Clear success message
    }
  };

  return (
    <>
      <h2 className="text-xl font-poppins text-white mb-4">User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-poppins mb-2">
            Username
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-400 rounded"
            id="username"
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-poppins mb-2">
            Email Address
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-400 rounded"
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-poppins mb-2">
            Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-400 rounded"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-poppins mb-2">
            Re-Enter Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-400 rounded"
            id="confirmPassword"
            type="password"
            placeholder="Re-Enter Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-poppins mb-2">Gender</label>
          <div>
            <label htmlFor="male" className="text-poppins text-white mr-2">
              Male
            </label>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male" // Assign the correct value for male
              checked={formData.gender === "male"}
              onChange={handleChange}
            />

            <label htmlFor="female" className="text-poppins text-white mx-2">
              Female
            </label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female" // Assign the correct value for female
              checked={formData.gender === "female"}
              onChange={handleChange}
            />

            <label htmlFor="other" className="text-poppins text-white mx-2">
              Other
            </label>
            <input
              type="radio"
              id="other"
              name="gender"
              value="other" // Assign the correct value for other
              checked={formData.gender === "other"}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-gray-700 font-poppins mb-2">
            Age
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-400 rounded"
            id="age"
            type="number"
            placeholder="Enter your Age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <button
          className="w-full font-poppins bg-blue-gradient text-white py-2 rounded hover:bg-blue-800 transition duration-200"
          type="submit"
        >
          Register
        </button>
        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </form>
    </>
  );
};

export default Registration;
