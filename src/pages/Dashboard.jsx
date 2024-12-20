import Overview from "./Overview";
import OrderSheet from "./OrderSheet";

function Dashboard() {
  return (
    <>
      <div
        id="sidebar"
        className="fixed bg-[#2a2c2d] w-64 h-[100vh] text-[#fff] p-8 flex flex-col"
      >
        <div id="logo">Sidebar</div>
        <hr className="my-4" />
        <div id="menu" className="space-y-4 hover:opacity-0.4">
          <p>Overview</p>
          <p>Order Sheet</p>
          <p>RFD</p>
          <p>Dispatched</p>
          <p>Cancelled</p>
          <p>Performance</p>
        </div>
        <div id="footer" className="mt-auto">
          <p>Log out</p>
        </div>
      </div>

      <div className="mx-64 w-[auto]">
        <Overview />
      </div>
    </>
  );
}

export default Dashboard;
