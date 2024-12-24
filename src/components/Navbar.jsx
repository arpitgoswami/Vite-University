import React, { useState } from "react";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <>
      {/* Navbar */}
      <nav className="ml-72 p-6 flex justify-between items-center h-14 bg-white px-6 shadow-lg text-sm/6">
        {/* Dashboard Label */}
        <div className="text-gray-800 font-semibold">Dashboard</div>

        {/* Notification Icon */}
        <div className="flex items-center space-x-4">
          <button className="relative" onClick={toggleSidebar}>
            <span className="absolute -top-2 -right-2 bg-indigo-500 text-xs text-white rounded-full px-2 py-0.5">
              7
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="gray"
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

      {/* Sidebar (Right Side) */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white text-gray-800 shadow-xl p-4 border-l border-gray-300">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <ul>
            <li className="mb-2">New comment on your post</li>
            <li className="mb-2">New follower</li>
            <li className="mb-2">Server downtime warning</li>
            <li className="mb-2">New message received</li>
            {/* Add more notifications here */}
          </ul>
          <button
            className="mt-4 bg-indigo-500 px-4 py-2 rounded-md text-white hover:bg-indigo-600"
            onClick={toggleSidebar}
          >
            Close Sidebar
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;
