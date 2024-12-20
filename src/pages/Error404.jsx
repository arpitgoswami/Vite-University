import React from "react";

function Error404() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 to-gray-900 flex flex-col justify-center items-center text-white">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <p className="text-2xl sm:text-3xl mb-6 text-center">
        Oops! Page not found.
      </p>
      <p className="text-lg mb-6 text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-semibold"
      >
        Go to Homepage
      </a>
    </div>
  );
}

export default Error404;
