import { GrOverview } from "react-icons/gr";
import { LuShoppingBag } from "react-icons/lu";
import { MdBorderColor } from "react-icons/md";
import { MdDataSaverOff } from "react-icons/md";
import { TbBrandSentry } from "react-icons/tb";
import { TbCancel } from "react-icons/tb";
import { IoStatsChart } from "react-icons/io5";

import { BiLogOutCircle } from "react-icons/bi";

import { handleDeleteCookie } from "@cookie";

function Sidebar({ onNavChange }) {
  return (
    <>
      <div
        id="sidebar"
        className="fixed p-4 bg-[#101828] w-72 h-[100vh] text-[#99A1AF] flex flex-col shadow-lg"
      >
        {/* Header */}
        <div className="flex items-center space-x-2 text-3xl font-bold mb-6">
          <img src="logo-sm.png" className="h-8" />
        </div>

        {/* Menu */}
        <div id="menu" className="flex flex-col space-y-1">
          <button
            className="flex p-2 text-sm/6 items-center space-x-2 rounded-md hover:bg-[#1E2939] hover:shadow transition-all duration-200 cursor-pointer"
            onClick={() => onNavChange("Overview")}
            autoFocus
          >
            <GrOverview size={20} />
            <span className="font-medium">Overview</span>
          </button>
          <button
            className="flex p-2 items-center space-x-2 rounded-md hover:bg-[#1E2939] hover:shadow transition-all duration-200 cursor-pointer"
            onClick={() => onNavChange("SalesReport")}
          >
            <LuShoppingBag size={20} />
            <span className="text-sm/6 font-medium">Sales Report</span>
          </button>
          <button
            className="flex p-2 items-center space-x-2 rounded-md hover:bg-[#1E2939] hover:shadow transition-all duration-200 cursor-pointer"
            onClick={() => onNavChange("OrderSheet")}
          >
            <MdBorderColor size={20} />
            <span className="text-sm/6 font-medium">Order Sheet</span>
          </button>
          <button className="flex p-2 items-center space-x-2 rounded-md hover:bg-[#1E2939] hover:shadow transition-all duration-200 cursor-pointer">
            <MdDataSaverOff size={20} />
            <span className="text-sm/6 font-medium">RFD</span>
          </button>
          <button className="flex p-2 items-center space-x-2 rounded-md hover:bg-[#1E2939] hover:shadow transition-all duration-200 cursor-pointer">
            <TbBrandSentry size={20} />
            <span className="text-sm/6 font-medium">Dispatched</span>
          </button>
          <button className="flex p-2 items-center space-x-2 rounded-md hover:bg-[#1E2939] hover:shadow transition-all duration-200 cursor-pointer">
            <TbCancel size={20} />
            <span className="text-sm/6 font-medium">Cancelled</span>
          </button>
          <button className="flex p-2 items-center space-x-2 rounded-md hover:bg-[#1E2939] hover:shadow transition-all duration-200 cursor-pointer">
            <IoStatsChart size={20} />
            <span className="text-sm/6 font-medium">Performance</span>
          </button>
        </div>

        {/* Footer */}
        <button
          onClick={handleDeleteCookie}
          id="footer"
          className="mt-auto flex p-2 items-center space-x-2 rounded-md hover:bg-[#1E2939] hover:shadow transition-all duration-200 cursor-pointer"
        >
          <BiLogOutCircle size={20} />
          <span className="text-sm/6 font-semibold">Log out</span>
        </button>
      </div>
    </>
  );
}

export default Sidebar;
