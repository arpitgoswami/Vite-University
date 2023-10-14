import ReactDOM from "react-dom";

import Dashboard from "./pages/dashboard";
import Assignments from "./pages/assignments";
import Academics from "./pages/academics";
import Payments from "./pages/payments";

import "./App.css";

function App() {
  function exit() {
    let a = document.getElementById("message");
    message.style.display = "none";
  }

  function renderApp(component, str) {
    ReactDOM.render(component, document.getElementById("workspace"));
  }

  return (
    <>
      <div className="h-screen flex">
        <nav
          className="bg-gray-800 text-gray-100"
          style={{ width: "18.5rem", position: "fixed", height: "100%" }}
        >
          <div className="p-4  text-2xl font-semibold">😎 Education</div>
          <div className="p-4 border-y-2">Project Overview</div>
          <div className="p-4 text-sm">Product Categories</div>
          <ul className="mx-4 p-4 space-y-4 bg-gray-900 rounded-lg cursor-pointer">
            <li
              className="hover:text-gray-400"
              onClick={() => renderApp(<Dashboard />)}
            >
              Dashboard
            </li>
            <li
              className="hover:text-gray-400"
              onClick={() => renderApp(<Assignments />)}
            >
              Assignments
            </li>
            <li
              className="hover:text-gray-400"
              onClick={() => renderApp(<Academics />)}
            >
              Academics
            </li>
            <li
              className="hover:text-gray-400"
              onClick={() => renderApp(<Payments />)}
            >
              Payments
            </li>
          </ul>
          <div className="p-4 text-sm">All Categories</div>
          <div className="mx-4  bg-gray-900 rounded-lg" id="message">
            <div className="p-4">
              <div className="font-semibold">Warning!</div>
              <div className="my-4 text-xs">
                This is an Pre-Alpha stage release which is only for testing
                purposes only.
              </div>
              <div className="flex space-x-8 text-blue-700 font-semibold">
                <a href="https://fonts.google.com/specimen/Open+Sans">
                  Learn More
                </a>
                <button onClick={exit}>Got it</button>
              </div>
            </div>
          </div>
          <div className="p-4 my-4 border-y-2">Upgrade</div>
        </nav>
        <div
          className="px-6 container mx-auto mt-8"
          style={{ marginLeft: "18.5rem" }}
        >
          <div id="workspace">
            <Dashboard />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
