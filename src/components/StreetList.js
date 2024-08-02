import React, { useState, useEffect, useCallback } from "react";
import "../App.css";

const StreetList = () => {
  const [allStreets, setAllStreets] = useState([]);
  const [filteredStreets, setFilteredStreets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterName, setFilterName] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [filterProvince, setFilterProvince] = useState("");
  const [filterCity, setFilterCity] = useState("");

  useEffect(() => {
    const fetchStreets = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/streets/`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAllStreets(data);
        setFilteredStreets(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStreets();
  }, []);

  // Función para aplicar los filtros
  const applyFilters = useCallback(() => {
    let filtered = allStreets;

    if (filterName) {
      filtered = filtered.filter((street) =>
        (street.name ? street.name.toLowerCase() : "").includes(
          filterName.toLowerCase()
        )
      );
    }

    if (filterRegion) {
      filtered = filtered.filter((street) =>
        (street.region ? street.region.toLowerCase() : "").includes(
          filterRegion.toLowerCase()
        )
      );
    }

    if (filterProvince) {
      filtered = filtered.filter((street) =>
        (street.province ? street.province.toLowerCase() : "").includes(
          filterProvince.toLowerCase()
        )
      );
    }

    if (filterCity) {
      filtered = filtered.filter((street) =>
        (street.city ? street.city.toLowerCase() : "").includes(
          filterCity.toLowerCase()
        )
      );
    }

    setFilteredStreets(filtered);
  }, [filterName, filterRegion, filterProvince, filterCity, allStreets]);

  // Ejecutar la función de filtrado cada vez que cambien los filtros
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="street-list-container">
      <h1>Grilla de Calles</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Filtro para nombre"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Región:</label>
          <input
            type="text"
            placeholder="Filtro para región"
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Provincia:</label>
          <input
            type="text"
            placeholder="Filtro para provincia"
            value={filterProvince}
            onChange={(e) => setFilterProvince(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Ciudad:</label>
          <input
            type="text"
            placeholder="Filtro para ciudad"
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
          />
        </div>
      </form>
      <table className="street-list-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Región</th>
            <th>Provincia</th>
            <th>Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {filteredStreets.length > 0 ? (
            filteredStreets.map((street) => (
              <tr key={street.id}>
                <td>{street.name}</td>
                <td>{street.region}</td>
                <td>{street.province}</td>
                <td>{street.city}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No se encontraron calles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StreetList;
