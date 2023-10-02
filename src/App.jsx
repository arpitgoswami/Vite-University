import Login from "./components/login";
import Sidebar from "./components/sidebar";
import Student from "./pages/student";

import Dashboard from "./pages/dashboard";

import "./App.css";

function App() {
  return (
    <>
      <div className="h-screen flex">
        <Sidebar />
        <div
          className="px-6 container mx-auto mt-8"
          style={{ marginLeft: "18.5rem" }}
        >
          <Dashboard />
        </div>
      </div>
    </>
  );
}

export default App;
