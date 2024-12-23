import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";

import Overview from "../layouts/Overview";
import TestSalesReport from "../test/testSalesReport";
import OrderSheet from "../layouts/OrderSheet";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [activeLayout, setActiveLayout] = useState("Overview");
  const [isValid, setIsValid] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div id="Sidebar">
        <Sidebar onNavChange={setActiveLayout} />
      </div>

      {/*<div id="Searchbar">
        <Searchbar />
      </div>*/}

      <div className="ml-72">
        {activeLayout === "Overview" && <Overview />}
        {activeLayout === "SalesReport" && <TestSalesReport />}
        {activeLayout === "OrderSheet" && <OrderSheet />}
      </div>
    </>
  );
}

export default Dashboard;
