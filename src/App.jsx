import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ComingSoon from "./pages/ComingSoon";
import Error404 from "./pages/Error404";

import TestUpdate from "./test/testUpdate";
import TestCreate from "./test/testCreate";

import Contact from "./pages/Contact";
import SalesReport from "./layouts/SalesReport";

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

          <Route path="/testUpdate/:id" element={<TestUpdate />} />

          <Route path="/testCreate/:doc" element={<TestCreate />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/salesreport" element={<SalesReport />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
