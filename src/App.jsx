import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ComingSoon from "./pages/ComingSoon";
import Error404 from "./pages/Error404";
import Edit from "./layouts/Edit";
import Update from "./layouts/Update";

import TestSalesReport from "./test/testSalesReport";
import Create from "./layouts/Create";

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
          <Route path="/edit" element={<Edit />} />
          <Route path="/update/:id" element={<Update />} />

          <Route path="/testSalesReport" element={<TestSalesReport />} />
          <Route path="/Create" element={<Create />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
