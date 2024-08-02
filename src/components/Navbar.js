import React from "react";
import { Link } from "react-router-dom";

// Estilos mejorados
const navbarStyle = {
  background: "#282c34", // Fondo oscuro
  color: "#fff",
  padding: "10px 20px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const ulStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  gap: "15px", // Espaciado entre elementos
};

const liStyle = {
  margin: 0,
};

const linkStyle = {
  color: "#61dafb", // Color de enlace
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "500",
  transition: "color 0.3s ease",
};

// Agregamos estilo para el hover
const linkHoverStyle = {
  color: "#21a0f6", // Color de enlace en hover
};

const Navbar = () => {
  return (
    <nav style={navbarStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link
            to="/"
            style={linkStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.color = linkHoverStyle.color)
            }
            onMouseOut={(e) => (e.currentTarget.style.color = linkStyle.color)}
          >
            Grilla Calles
          </Link>
        </li>
        <li style={liStyle}>
          <Link
            to="/editar"
            style={linkStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.color = linkHoverStyle.color)
            }
            onMouseOut={(e) => (e.currentTarget.style.color = linkStyle.color)}
          >
            Editar Calle
          </Link>
        </li>
        <li style={liStyle}>
          <Link
            to="/agregar"
            style={linkStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.color = linkHoverStyle.color)
            }
            onMouseOut={(e) => (e.currentTarget.style.color = linkStyle.color)}
          >
            Agregar Calle
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
