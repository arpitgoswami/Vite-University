import React from "react";

function Searchbar() {
  return (
    <nav className="ml-72 p-6 flex justify-between items-center h-14 bg-gray-800 px-6 shadow-lg">
      {/* Search Bar */}
      <div className="flex items-center space-x-3">
        <label htmlFor="search" className="text-gray-400 text-sm">
          Search
        </label>
        <input
          type="text"
          id="search"
          className="bg-gray-700 text-gray-200 placeholder-gray-500 text-sm px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
          placeholder="Search..."
        />
      </div>

      {/* Notification Icon */}
      <div className="flex items-center space-x-4">
        <button className="relative">
          <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white rounded-full px-2 py-0.5">
            7
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Searchbar;
