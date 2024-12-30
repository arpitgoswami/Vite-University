import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import Overview from "../layouts/Overview";
import OrderSheet from "../layouts/OrderSheet";
import SalesReport from "../layouts/SalesReport";

import { readCookie } from "@cookie";

function Dashboard() {
  const params = useParams();

  return (
    <>
      <div id="Sidebar">
        <Sidebar />
      </div>

      <div className="ml-72">
        <Navbar />
      </div>

      <div className="ml-72">
        {params.path === "overview" && <Overview />}
        {params.path === "salesreport" && <SalesReport />}
        {params.path === "ordersheet" && <OrderSheet />}
      </div>
    </>
  );
}

export default Dashboard;
