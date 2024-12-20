import { useState } from "react";
import Sidebar from "../components/Sidebar";

import Overview from "../layouts/Overview";
import OrderSheet from "../layouts/OrderSheet";

function Dashboard() {
  const [activeLayout, setActiveLayout] = useState("Overview");

  return (
    <>
      <div id="Sidebar">
        <Sidebar onNavChange={setActiveLayout} />
      </div>

      <div className="mx-72">
        {activeLayout === "Overview" && <Overview />}
        {activeLayout === "OrderSheet" && <OrderSheet />}
      </div>
    </>
  );
}

export default Dashboard;
