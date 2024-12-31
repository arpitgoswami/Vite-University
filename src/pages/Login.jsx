import axios from "@axios";
import { createCookie } from "@cookie";
import { Token } from "@mui/icons-material";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [USERNAME, setUsername] = useState("");
  const [PASSWORD, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("login", {
        USERNAME,
        PASSWORD,
      });

      if (response.status === 200) {
        const token = response.data.token;
        document.cookie = `authToken=${token};`;
        toast.success("Login successful!", {
          onClose: () => {
            window.location.href = "../dashboard";
          },
          autoClose: 1000,
        });
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("The password is incorrect.", {
          autoClose: 2000,
        });
      } else if (error.response?.status === 404) {
        toast.error("No user found with this username.", {
          autoClose: 2000,
        });
      } else {
        console.error("Error during login:", error);
        toast.error("Server could not be accessed.", {
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <div className="flex h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src="/logo.jpg" className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Enter your username"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                  onClick={() => (window.location.href = "../contact")}
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                type="password"
                placeholder="Enter your password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{" "}
          <a
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
            onClick={() => (window.location.href = "../contact")}
          >
            Raise a query
          </a>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
