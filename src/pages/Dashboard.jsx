import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import Overview from "../layouts/Overview";
import OrderSheet from "../layouts/OrderSheet";
import SalesReport from "../layouts/SalesReport";

import DataTable from "../components/interface/DataTable";

import { readCookie } from "@cookie";

function Dashboard() {
  const [activeLayout, setActiveLayout] = useState("Overview");
  const [isValid, setIsValid] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <>
      <div id="Sidebar">
        <Sidebar onNavChange={setActiveLayout} />
      </div>

      {/*<div id="Searchbar">
        <Navbar />
      </div>*/}

      <div className="ml-72">
        {activeLayout === "Overview" && <Overview />}
        {activeLayout === "SalesReport" && <SalesReport />}
        {activeLayout === "OrderSheet" && <OrderSheet />}
      </div>
    </>
  );
}

export default Dashboard;
