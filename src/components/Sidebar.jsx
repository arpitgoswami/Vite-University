import { GrAnalytics } from "react-icons/gr";

import { GrOverview } from "react-icons/gr";
import { MdBorderColor } from "react-icons/md";
import { MdDataSaverOff } from "react-icons/md";
import { TbBrandSentry } from "react-icons/tb";
import { TbCancel } from "react-icons/tb";
import { IoStatsChart } from "react-icons/io5";

import { BiLogOutCircle } from "react-icons/bi";

function Sidebar({ onNavChange }) {
  return (
    <>
      <div
        id="sidebar"
        className="fixed bg-[#2a2c2d] w-72 h-[100vh] text-[#fff] p-8 flex flex-col"
      >
        <div className="flex items-center space-x-2">
          <GrAnalytics />
          <span>
            <b>ALPEX PHARMA</b>
          </span>
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
        <div id="footer" className="mt-auto flex items-center space-x-2">
          <BiLogOutCircle />
          <span>Log out</span>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
