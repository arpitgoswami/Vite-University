import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold text-center">Dashboard</h1>
        <nav className="mt-6">
          <ul>
            <li>
              <Link
                to="/"
                className="block py-2 text-lg hover:bg-blue-700 rounded"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 text-lg hover:bg-blue-700 rounded"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block py-2 text-lg hover:bg-blue-700 rounded"
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white p-4 shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">
              Welcome to Your Dashboard
            </h2>
            <div>
              <button className="text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                Profile
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-lg font-semibold">Sales Overview</h3>
              <p className="text-4xl font-bold text-blue-600 mt-4">$10,000</p>
              <p className="text-gray-500 mt-2">Total sales this month</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-lg font-semibold">New Users</h3>
              <p className="text-4xl font-bold text-green-600 mt-4">250</p>
              <p className="text-gray-500 mt-2">New users this month</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-lg font-semibold">Pending Orders</h3>
              <p className="text-4xl font-bold text-yellow-600 mt-4">45</p>
              <p className="text-gray-500 mt-2">Orders to be processed</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
