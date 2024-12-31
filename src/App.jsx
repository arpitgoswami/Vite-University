import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ComingSoon from "./pages/ComingSoon";
import Error404 from "./pages/Error404";

import TestUpdate from "./test/testUpdate";
import TestCreate from "./test/testCreate";

import Contact from "./pages/Contact";
import SalesReport from "./layouts/SalesReport";

import TestRoute from "./test/testRoute";
import Approval from "./components/interface/Approval";

import Invoice from "./components/Invoice";

function App() {
  return (
    <Router>
      <Routes>
        {/* Fallback route for unmatched paths */}
        <Route path="*" element={<Error404 />} />
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/comingsoon" element={<ComingSoon />} />
        <Route path="/contact" element={<Contact />} />

        {/* Test Routes */}
        <Route path="/testUpdate/:id" element={<TestUpdate />} />
        <Route path="/testCreate/:doc" element={<TestCreate />} />
        <Route path="/testroute" element={<TestRoute />} />

        {/* Approval Routes */}
        <Route path="/approval" element={<Approval />} />
        <Route path="/approval/:id" element={<Approval />} />

        {/* Layout and Component Routes */}
        <Route path="/invoice/:id/:doc" element={<Invoice />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:path" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
