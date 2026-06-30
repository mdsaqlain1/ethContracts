import { useState } from "react";
import "./App.css";
import Wallet from "../components/Wallet";
import HeroPage from "../components/HeroPage";
import Dashboard from "../components/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Wallet />
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/stake" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
