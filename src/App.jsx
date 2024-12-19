import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Test";
import ComingSoon from "./pages/ComingSoon";

import "./styles/App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test" element={<Test />} />
          <Route path="comingsoon" element={<ComingSoon />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
