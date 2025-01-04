import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ComingSoon from "./pages/ComingSoon";
import Error404 from "./pages/Error404";
import TestUpdate from "./test/testUpdate";
import TestCreate from "./test/testCreate";
import Contact from "./pages/Contact";

import TestRoute from "./test/testRoute";
import Approval from "./components/interface/Approval";
import Invoice from "./components/Invoice";
import PrivateRoute from "./pages/PrivateRoute"; // Import PrivateRoute

import Overview2 from "./layouts/Tasks";
import ExcelView from "./components/interface/ExcelView";

import TestRoute2 from "./test/testRoute2";

function App() {
  return (
    <section className="font-sans" style={{ fontFamily: "Poppins" }}>
      <Router>
        <Routes>
          {/* Fallback route for unmatched paths */}
          <Route path="*" element={<Error404 />} />

          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/comingsoon" element={<ComingSoon />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/overview2" element={<Overview2 />} />

          {/* Test Routes */}
          <Route
            path="/testUpdate/:id"
            element={
              <PrivateRoute>
                <TestUpdate />
              </PrivateRoute>
            }
          />

          <Route
            path="/excelview"
            element={
              <PrivateRoute>
                <ExcelView />
              </PrivateRoute>
            }
          />
          <Route
            path="/testCreate/:doc"
            element={
              <PrivateRoute>
                <TestCreate />
              </PrivateRoute>
            }
          />
          <Route
            path="/testroute"
            element={
              <PrivateRoute>
                <TestRoute />
              </PrivateRoute>
            }
          />

          {/* Approval Routes */}
          <Route
            path="/approval"
            element={
              <PrivateRoute>
                <Approval />
              </PrivateRoute>
            }
          />
          <Route
            path="/approval/:id"
            element={
              <PrivateRoute>
                <Approval />
              </PrivateRoute>
            }
          />

          {/* Layout and Component Routes */}
          <Route
            path="/invoice/:id/:doc"
            element={
              <PrivateRoute>
                <Invoice />
              </PrivateRoute>
            }
          />

          {/* Dashboard Routes */}
          <Route
            path="/dashboard/:path"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </section>
  );
}

export default App;
