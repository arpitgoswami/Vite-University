import { useState } from "react";
import Sidebar from "../components/Sidebar";

import Overview from "../layouts/Overview";
import SalesReport from "../layouts/SalesReport";
import OrderSheet from "../layouts/OrderSheet";

import Searchbar from "../components/Searchbar";

import TestSalesReport from "../test/testSalesReport";

function Dashboard() {
  const [activeLayout, setActiveLayout] = useState("Overview");

  return (
    <>
      <div id="Sidebar">
        <Sidebar onNavChange={setActiveLayout} />
      </div>

      <div id="Searchbar">
        <Searchbar />
      </div>

      <div className="ml-72">
        {activeLayout === "Overview" && <Overview />}
        {activeLayout === "SalesReport" && <TestSalesReport />}
        {activeLayout === "OrderSheet" && <OrderSheet />}
      </div>
    </>
  );
}

export default Dashboard;
