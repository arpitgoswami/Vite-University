import React, { useState } from "react";

function Login() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            Welcome Back!
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                I am a:
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="teacher"
                    className="form-radio text-blue-500 focus:ring focus:border-blue-300"
                  />
                  <span className="ml-2">Teacher</span>
                </label>
                <label className="flex items-center text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="student"
                    className="form-radio text-blue-500 focus:ring focus:border-blue-300"
                  />
                  <span className="ml-2">Student</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                name="username"
                className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
