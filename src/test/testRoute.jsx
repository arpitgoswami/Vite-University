import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TbProgressAlert } from "react-icons/tb";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { LuUsersRound } from "react-icons/lu";

import { CgProfile } from "react-icons/cg";
import { BiLogOutCircle } from "react-icons/bi";

function TestRoute() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);

  const navigate = useNavigate();

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
    <aside
      className={`fixed text-lg h-screen bg-[#151A2D] text-white transition-all duration-200 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <header className="flex items-center justify-between p-4">
        <img
          src="./logo.jpg"
          alt="Logo"
          className="w-12 h-12 rounded-full object-cover"
        />
        <button
          className="w-9 h-9 flex items-center justify-center rounded-md bg-white text-gray-900"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <MdKeyboardArrowRight size={20} />
          ) : (
            <MdKeyboardArrowLeft size={20} />
          )}
        </button>
      </header>

      <nav
        className={`px-4 ${
          isMenuActive || !isCollapsed ? "block" : "hidden lg:block"
        }`}
      >
        <ul className="space-y-2">
          <li
            onClick={() => {
              navigate("../dashboard/overview");
            }}
          >
            <a
              href="#"
              className="flex items-center gap-4 p-3 rounded-md hover:bg-white hover:text-gray-900 transition"
            >
              <RxDashboard size={20} />
              {!isCollapsed && <span>Dashboard</span>}
            </a>
          </li>
          <li
            onClick={() => {
              navigate("../dashboard/notification");
            }}
          >
            <a
              href="#"
              className="flex items-center gap-4 p-3 rounded-md hover:bg-white hover:text-gray-900 transition"
            >
              <MdOutlineNotificationsActive size={20} />
              {!isCollapsed && <span>Notifications</span>}
            </a>
          </li>
          <li
            onClick={() => {
              navigate("../dashboard/salesreport");
            }}
          >
            <a
              href="#"
              className="flex items-center gap-4 p-3 rounded-md hover:bg-white hover:text-gray-900 transition"
            >
              <TbProgressAlert size={20} />
              {!isCollapsed && <span>Sales Report</span>}
            </a>
          </li>
          <li
            onClick={() => {
              navigate("../dashboard/ppic");
            }}
          >
            <a className="flex items-center gap-4 p-3 rounded-md hover:bg-white hover:text-gray-900 transition">
              <HiOutlineDocumentReport size={20} />
              {!isCollapsed && <span>PPIC Register</span>}
            </a>
          </li>
          <li
            onClick={() => {
              navigate("../dashboard/analytics");
            }}
          >
            <a className="flex items-center gap-4 p-3 rounded-md hover:bg-white hover:text-gray-900 transition">
              <LuUsersRound size={20} />
              {!isCollapsed && <span>Analytics</span>}
            </a>
          </li>
          <li>
            <a className="flex items-center gap-4 p-3 rounded-md hover:bg-white hover:text-gray-900 transition">
              <CgProfile size={20} />
              {!isCollapsed && <span>Profile</span>}
            </a>
          </li>
          <li onClick={() => handleDeleteCookie(username)}>
            <a className="flex items-center gap-4 p-3 rounded-md hover:bg-white hover:text-gray-900 transition">
              <BiLogOutCircle size={20} />
              {!isCollapsed && <span>Logout</span>}
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default TestRoute;
