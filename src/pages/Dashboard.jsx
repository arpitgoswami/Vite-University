import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import Overview from "../layouts/Overview";
import Tasks from "../layouts/Tasks";

import SalesReport from "../layouts/SalesReport";
import PPIC from "../layouts/PPIC";
import Users from "../layouts/Users";

function Dashboard() {
  const params = useParams();

  return (
    <>
      <Sidebar />

      {params.path === "overview" && <Overview />}
      {params.path === "tasks" && <Tasks />}
      {params.path === " " && <Overview />}
      {params.path === "salesreport" && <SalesReport />}
      {params.path === "ppic" && <PPIC />}
      {params.path === "users" && <Users />}
    </>
  );
}

export default Dashboard;
