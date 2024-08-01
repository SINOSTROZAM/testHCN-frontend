// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StreetForm from "./components/StreetForm";
import StreetList from "./components/StreetList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<StreetList />} />
          <Route path="/agregar" element={<StreetForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
