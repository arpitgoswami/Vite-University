import { SiBmcsoftware } from "react-icons/si";

import { GrOverview } from "react-icons/gr";
import { LuShoppingBag } from "react-icons/lu";
import { MdBorderColor } from "react-icons/md";
import { MdDataSaverOff } from "react-icons/md";
import { TbBrandSentry } from "react-icons/tb";
import { TbCancel } from "react-icons/tb";
import { IoStatsChart } from "react-icons/io5";

import { BiLogOutCircle } from "react-icons/bi";

import axios from "axios";

function Sidebar({ onNavChange }) {
  const handleDeleteCookie = () => {
    axios
      .get("http://localhost:3000/delete-cookie", { withCredentials: true })
      .then((response) => {
        alert("You have been logged out.");
        window.location.reload();
      })
      .catch((error) => {
        console.error(
          "Error deleting cookie:",
          error.response?.data || error.message
        );
        alert("Failed to logout.");
      });
  };

  return (
    <>
      <div
        id="sidebar"
        className="fixed bg-[#2a2c2d] w-72 h-[100vh] text-[#fff] p-8 flex flex-col"
      >
        <div className="flex items-center space-x-2">
          <img src="./logo.jpg" />
        </div>
        <hr className="mt-8 mb-6 opacity-50" />
        <div id="menu" className="hover:opacity-0.4">
          <div
            className="mt-auto flex items-center space-x-2"
            onClick={() => onNavChange("Overview")}
          >
            <GrOverview />
            <span>Overview</span>
          </div>
          <div
            className="mt-auto flex items-center space-x-2"
            onClick={() => onNavChange("SalesReport")}
          >
            <LuShoppingBag />
            <span>Sales Report</span>
          </div>
          <div
            className="mt-auto flex items-center space-x-2"
            onClick={() => onNavChange("OrderSheet")}
          >
            <MdBorderColor />
            <span>Order Sheet</span>
          </div>
          <div className="mt-auto flex items-center space-x-2">
            <MdDataSaverOff />
            <span>RFD</span>
          </div>
          <div className="mt-auto flex items-center space-x-2">
            <TbBrandSentry />
            <span>Dispatched</span>
          </div>
          <div className="mt-auto flex items-center space-x-2">
            <TbCancel />
            <span>Cancelled</span>
          </div>
          <div className="mt-auto flex items-center space-x-2">
            <IoStatsChart />
            <span>Performance</span>
          </div>
        </div>
        <button
          onClick={handleDeleteCookie}
          id="footer"
          className="mt-auto flex items-center space-x-2"
        >
          <BiLogOutCircle />
          <span>Log out</span>
        </button>
      </div>
    </>
  );
}

export default Sidebar;
