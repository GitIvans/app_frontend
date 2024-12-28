import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginRegisterPage from "./LoginRegisterPage";
import Subscriptions from "./Subscriptions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegisterPage />} />
        <Route path="/dashboard" element={<Subscriptions />} />
      </Routes>
    </Router>
  );
}

export default App;
