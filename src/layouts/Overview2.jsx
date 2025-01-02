import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "@axios";
import Overview from "./Overview";

function Overview2() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const [pendingCount, setPendingCount] = useState(null);
  const [pendingSales, setPendingSales] = useState([]); // Store pending sales records

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await axios.get("/status/pending");
        setPendingCount(response.data.pendingCount);
        setPendingSales(response.data.pendingRecords); // Store the sales records
      } catch (error) {
        console.error("Error fetching pending count:", error);
      }
    };
    fetchPendingCount();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const formatPathname = (pathname) => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.join(" > ");
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  ></path>
                </svg>
              </li>

              <li>
                <span className="inline-flex items-center capitalize">
                  {formatPathname(location.pathname)}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">Alpex Pharma</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle" onClick={toggleSidebar}>
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {pendingCount > 0 && (
                <span className="badge badge-xs badge-primary indicator-item"></span>
              )}
            </div>
          </button>
        </div>
        {isSidebarOpen && (
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-xl border-l border-gray-300 p-4 overflow-y-auto z-50">
            <div className="text-lg font-bold mb-4">Notifications</div>
            {pendingSales.length > 0 ? (
              pendingSales.map((sale, index) => (
                <div key={index} className="mb-4">
                  <div
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/approval/${sale["SALES ID"]}?doc=sales&sales_id=${sale._id}`
                      )
                    }
                  >
                    <p className="text-sm">SALES ID: {sale["SALES ID"]}</p>
                  </div>
                  {index < pendingSales.length - 1 && (
                    <hr className="my-2 border-gray-300" />
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No pending approvals.</p>
            )}
            <div className="mt-4">
              <button
                className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
                onClick={toggleSidebar}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Overview2;
