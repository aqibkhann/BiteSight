import React from "react";

const Registration = () => {
  return (
    <>
      <h2 className="text-xl font-poppins text-white mb-4 ">
        User Registration{" "}
      </h2>
      <form>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-poppins mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-400 rounded"
            id="username"
            type="text"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-poppins mb-2"
            htmlFor="username"
          >
            Email-Address
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-400 rounded"
            id="username"
            type="text"
            placeholder="Enter your Email Address"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-poppins mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-400 rounded"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-poppins mb-2"
            htmlFor="password"
          >
            Re-Enter Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-400 rounded"
            id="password"
            type="password"
            placeholder="Re-Enter Password"
          />
        </div>

        <div className="mb-4">
          <label for="male" className="text-poppins text-white">
            Male
          </label>
          <input type="radio" id="male" name="gender" value="male" />

          <label for="female" className="text-poppins text-white">
            Female
          </label>
          <input type="radio" id="female" name="gender" value="female" />

          <label for="male" className="text-poppins text-white">
            Other
          </label>
          <input type="radio" id="Other" name="gender" value="Other" />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-poppins mb-2"
            htmlFor="Age"
          >
            Age
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-400 rounded"
            id="Age"
            type="text"
            placeholder="Enter your Age"
          />
        </div>
        <button
          className="w-full font-poppins bg-blue-gradient text-white py-2 rounded hover:bg-blue-800 transition duration-200"
          type="submit"
        >
          Register!
        </button>
      </form>
    </>
  );
};

export default Registration;
