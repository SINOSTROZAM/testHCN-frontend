// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import StreetForm from "./components/StreetForm";
import StreetList from "./components/StreetList";
import StreetEdit from "./components/StreetEdit";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<StreetList />} />
          <Route path="/agregar" element={<StreetForm />} />
          <Route path="/editar" element={<StreetEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
