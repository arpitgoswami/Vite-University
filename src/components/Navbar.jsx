import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@axios";

import { readCookie } from "../utils/cookieUtils";
import { handleDeleteCookie } from "../utils/cookieUtils";

import { ToastContainer } from "react-toastify";

import { RiAccountCircleLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbReport } from "react-icons/tb";
import { PiCashRegisterBold } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi2";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const [pendingCount, setPendingCount] = useState(null);
  const [pendingSales, setPendingSales] = useState([]); // Store pending sales records

  const username = readCookie("username");

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
      <div className="navbar bg-base-100 border">
        <div className="navbar-start">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer" className="btn btn-ghost btn-square">
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
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
            </div>
            <div className="drawer-side z-10">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li>
                  <a
                    onClick={() => {
                      navigate("../dashboard/overview");
                    }}
                  >
                    <RxDashboard />
                    Overview
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("../dashboard/salesreport");
                    }}
                  >
                    <TbReport />
                    Sales Report
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("../dashboard/ppic");
                    }}
                  >
                    <PiCashRegisterBold />
                    PPIC Register
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("../dashboard/users");
                    }}
                  >
                    <HiOutlineUsers />
                    Users
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="navbar-center">
          <a
            className="hover:opacity-80 cursor-pointer"
            onClick={() => navigate("../dashboard/overview")}
          >
            <img src="/logo.jpg" className="w-[14rem]" />
          </a>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-square btn-ghost"
            >
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
                  <span className="indicator-item indicator-end badge badge-xs badge-primary"></span>
                )}
              </div>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              {pendingSales.length > 0 ? (
                pendingSales.map((sale, index) => (
                  <li key={index}>
                    <a
                      onClick={() =>
                        navigate(
                          `/approval/${sale["SALES ID"]}?doc=sales&sales_id=${sale._id}`
                        )
                      }
                    >
                      <p>Approval {index + 1}</p>
                    </a>
                  </li>
                ))
              ) : (
                <li>
                  <a>
                    <p>No pending approvals.</p>
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-square"
            >
              <RiAccountCircleLine size={20} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Profile</a>
              </li>
              <div className="divider mt-0 mb-0"></div>
              <li>
                <a onClick={() => handleDeleteCookie(username)}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Navbar;
