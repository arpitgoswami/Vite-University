import { GrOverview } from "react-icons/gr";
import { LuShoppingBag } from "react-icons/lu";
import { MdBorderColor } from "react-icons/md";
import { MdDataSaverOff } from "react-icons/md";
import { TbBrandSentry } from "react-icons/tb";
import { TbCancel } from "react-icons/tb";
import { IoStatsChart } from "react-icons/io5";
import { BiLogOutCircle } from "react-icons/bi";
import { VscCircleFilled } from "react-icons/vsc";

import { handleDeleteCookie } from "@cookie";

import { ToastContainer } from "react-toastify";

function Sidebar({ onNavChange }) {
  return (
    <>
      <div
        id="sidebar"
        className="fixed p-4 bg-[#101828] w-72 h-[100vh] text-[#99A1AF] flex flex-col shadow-lg"
      >
        {/* Header */}
        <div
          className="mb-6 cursor-pointer flex drop-shadow-md"
          onClick={() => (window.location.href = "../dashboard")}
        >
          <img src="logo-no-bg.png" className="w-52" alt="Logo" />
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
            onClick={() => onNavChange("PurchaseOrder")}
          >
            <TbBrandSentry size={20} />
            <span className="text-sm/6 font-medium">Purchase Order</span>
          </button>

          <div id="innerButtons" className="ml-6">
            <button
              className="flex p-1 items-center space-x-2 rounded-md transition-all duration-200 cursor-pointer"
              onClick={() => onNavChange("OrderSheet")}
            >
              <VscCircleFilled size={10} />
              <span className="text-sm/6 font-medium">Order Sheet</span>
            </button>

            <button className="flex p-1 items-center space-x-2 rounded-md transition-all duration-200 cursor-pointer">
              <VscCircleFilled size={10} />
              <span className="text-sm/6 font-medium">RFD</span>
            </button>

            <button className="flex px-1 pt-1 pb-2 items-center space-x-2 rounded-md transition-all duration-200 cursor-pointer">
              <VscCircleFilled size={10} />
              <span className="text-sm/6 font-medium">Cancelled</span>
            </button>
          </div>

          <button
            className="flex p-2 items-center space-x-2 rounded-md hover:bg-[#1E2939] hover:shadow transition-all duration-200 cursor-pointer"
            onClick={() => onNavChange("Performance")}
          >
            <IoStatsChart size={20} />
            <span className="text-sm/6 font-medium">Performance</span>
          </button>
        </div>

        {/* Footer */}
        <button
          onClick={handleDeleteCookie}
          id="footer"
          className="mt-auto flex p-2 items-center bg-[#DC2626] text-[#fff] space-x-2 rounded-md hover:bg-[#1E2939] hover:shadow transition-all duration-200 cursor-pointer"
        >
          <BiLogOutCircle size={20} />
          <span className="text-sm/6 font-semibold">Log out</span>
        </button>
      </div>
      <ToastContainer />
    </>
  );
}

export default Sidebar;
