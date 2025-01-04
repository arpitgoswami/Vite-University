import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { readCookie } from "../utils/cookieUtils";
import { handleDeleteCookie } from "../utils/cookieUtils";

import axios from "@axios";

import { HiMiniBars3, HiMiniBars3BottomRight } from "react-icons/hi2";
import { BiTask } from "react-icons/bi";

import { RxDashboard } from "react-icons/rx";
import { TbProgressAlert } from "react-icons/tb";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { LuUsersRound } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { BiLogOutCircle } from "react-icons/bi";
import { MdOutlineNotificationsActive } from "react-icons/md";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMenuActive, setIsMenuActive] = useState(true);
  const [pendingCount, setPendingCount] = useState(null);
  const [pendingSales, setPendingSales] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const formatPathname = (pathname) => {
    const segments = pathname.split("/").filter(Boolean);
    return segments[segments.length - 1] || "";
  };

  const username = readCookie("username");

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await axios.get("/status/pending");
        setPendingCount(response.data.pendingCount);
        setPendingSales(response.data.pendingRecords);
      } catch (error) {
        console.error("Error fetching pending count:", error);
      }
    };
    fetchPendingCount();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1020) {
        setIsMenuActive(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed text-lg h-screen z-10 bg-[#151A2D] text-white transition-all duration-200 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <header className={`flex items-center justify-between p-4`}>
          <img
            src="/logo.jpg"
            className={`w-[11rem] h-auto rounded-sm ${
              isCollapsed ? "hidden" : "block"
            }`}
          />
          <button
            className={`btn btn-square btn-ghost bg-white text-[#151A2D] hover:bg-white hover:opacity-80 btn-sm duration-500  ${
              isCollapsed ? "w-full" : ""
            }`}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <HiMiniBars3 size={26} />
            ) : (
              <HiMiniBars3BottomRight size={26} />
            )}
          </button>
        </header>

        <nav
          className={`flex mt-4 justify-center ${
            isMenuActive || !isCollapsed ? "block" : "hidden lg:block"
          }`}
        >
          <ul className="space-y-2">
            <li onClick={() => navigate("../dashboard/overview")}>
              <a
                className={`btn btn-ghost hover:bg-[#fff] hover:text-[#151A2D] ${
                  isCollapsed ? "btn-square" : "text-lg"
                }`}
              >
                <RxDashboard size={24} />
                {!isCollapsed && <span>Dashboard</span>}
              </a>
            </li>
            <li onClick={() => navigate("../dashboard/tasks")}>
              <a
                className={`btn btn-ghost hover:bg-[#fff] hover:text-[#151A2D] ${
                  isCollapsed ? "btn-square" : "text-lg"
                }`}
              >
                <BiTask size={24} />
                {!isCollapsed && <span>Tasks</span>}
              </a>
            </li>
            <li onClick={() => navigate("../dashboard/notification")}>
              <a
                className={`btn btn-ghost hover:bg-[#fff] hover:text-[#151A2D] ${
                  isCollapsed ? "btn-square" : "text-lg"
                }`}
              >
                <MdOutlineNotificationsActive size={20} />
                {!isCollapsed && <span>Notifications</span>}
              </a>
            </li>
            <li onClick={() => navigate("../dashboard/salesreport")}>
              <a
                className={`btn btn-ghost hover:bg-[#fff] hover:text-[#151A2D] ${
                  isCollapsed ? "btn-square" : "text-lg"
                }`}
              >
                <TbProgressAlert size={20} />
                {!isCollapsed && <span>Sales Report</span>}
              </a>
            </li>
            <li onClick={() => navigate("../dashboard/salesreport")}>
              <a
                className={`btn btn-ghost hover:bg-[#fff] hover:text-[#151A2D] ${
                  isCollapsed ? "btn-square" : "text-lg"
                }`}
              >
                <HiOutlineDocumentReport size={20} />
                {!isCollapsed && <span>PPIC Register</span>}
              </a>
            </li>
            <li onClick={() => navigate("../dashboard/analytics")}>
              <a
                className={`btn btn-ghost hover:bg-[#fff] hover:text-[#151A2D] ${
                  isCollapsed ? "btn-square" : "text-lg"
                }`}
              >
                <LuUsersRound size={20} />
                {!isCollapsed && <span>Analytics</span>}
              </a>
            </li>
            <li>
              <a
                className={`btn btn-ghost hover:bg-[#fff] hover:text-[#151A2D] ${
                  isCollapsed ? "btn-square" : "text-lg"
                }`}
              >
                <CgProfile size={20} />
                {!isCollapsed && <span>Profile</span>}
              </a>
            </li>
            <li
              onClick={() => {
                handleDeleteCookie(username);
              }}
            >
              <a
                className={`btn btn-error hover:bg-[#fff] hover:text-[#151A2D] ${
                  isCollapsed ? "btn-square" : "text-lg"
                }`}
              >
                <BiLogOutCircle size={20} />
                {!isCollapsed && <span>Logout</span>}
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Navbar */}
      <div
        className={`flex-1 transition-all duration-200  bg-gray-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="navbar h-4 border-b border-gray-300">
          <div className="flex-1 breadcrumbs text-sm">
            <ul>
              <li
                className="btn btn-square btn-ghost"
                onClick={() => navigate("../dashboard/overview")}
              >
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </li>
              <li>
                <p>Dashboard</p>
              </li>
              <li>
                <span className="inline-flex items-center capitalize">
                  {formatPathname(location.pathname)}
                </span>
              </li>
            </ul>
          </div>
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
                    <p>No alerts ..</p>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Sidebar;
