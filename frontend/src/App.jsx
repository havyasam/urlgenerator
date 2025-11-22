import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Health from "./components/Health";
import Dashboard from "./components/Dashboard";
import Stats from "./components/Stats";
import Top from "./components/Top";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Router>
     

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code/:code" element={<Stats />} />
          <Route path="/healthz" element={<Health />} />

          
        </Routes>
      </Router>
    </>
  );
}

export default App;
