import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ComingSoon from "./pages/ComingSoon";
import Error404 from "./pages/Error404";

import TestSalesReport from "./test/testSalesReport";
import TestUpdate from "./test/testUpdate";

import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/comingsoon" element={<ComingSoon />} />

          <Route path="/testSalesReport" element={<TestSalesReport />} />
          <Route path="/testUpdate/:id" element={<TestUpdate />} />

          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
