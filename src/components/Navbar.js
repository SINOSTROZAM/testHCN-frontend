import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="nav-link">
            Grilla Calles
          </Link>
        </li>
        <li>
          <Link to="/editar" className="nav-link">
            Editar Calle
          </Link>
        </li>
        <li>
          <Link to="/agregar" className="nav-link">
            Agregar Calle
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
