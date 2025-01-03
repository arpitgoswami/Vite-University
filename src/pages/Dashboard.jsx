import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import Overview from "../layouts/Overview";
import Overview2 from "../layouts/Overview2";

import SalesReport from "../layouts/SalesReport";
import PPIC from "../layouts/PPIC";
import Users from "../layouts/Users";

import BreadCrums from "../components/BreadCrums";

function Dashboard() {
  const params = useParams();

  return (
    <>
      <Sidebar />

      <div className="ml-20">
        {params.path === "overview" && <Overview />}
        {params.path === "overview2" && <Overview2 />}
        {params.path === " " && <Overview />}
        {params.path === "salesreport" && <SalesReport />}
        {params.path === "ppic" && <PPIC />}
        {params.path === "users" && <Users />}
      </div>
    </>
  );
}

export default Dashboard;
