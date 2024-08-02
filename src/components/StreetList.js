import React, { useState, useEffect } from "react";

const StreetList = () => {
  // Estado para almacenar la lista completa de calles
  const [allStreets, setAllStreets] = useState([]);
  // Estado para almacenar las calles filtradas
  const [filteredStreets, setFilteredStreets] = useState([]);
  // Estado para manejar el estado de carga
  const [loading, setLoading] = useState(true);
  // Estado para manejar errores
  const [error, setError] = useState(null);
  // Estados para los filtros
  const [filterName, setFilterName] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [filterProvince, setFilterProvince] = useState("");
  const [filterCity, setFilterCity] = useState("");

  useEffect(() => {
    // Función para recuperar las calles desde la API
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

  // Función para manejar el filtrado
  const handleFilterChange = () => {
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
  };

  // Manejo de estado de carga
  if (loading) {
    return <p>Loading...</p>;
  }

  // Manejo de errores
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Grilla de Calles</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Filtro para nombre"
          value={filterName}
          onChange={(e) => {
            setFilterName(e.target.value);
            handleFilterChange();
          }}
        />
        <input
          type="text"
          placeholder="Filtro para region"
          value={filterRegion}
          onChange={(e) => {
            setFilterRegion(e.target.value);
            handleFilterChange();
          }}
        />
        <input
          type="text"
          placeholder="Filtro para provincia"
          value={filterProvince}
          onChange={(e) => {
            setFilterProvince(e.target.value);
            handleFilterChange();
          }}
        />
        <input
          type="text"
          placeholder="Filtro para ciudad"
          value={filterCity}
          onChange={(e) => {
            setFilterCity(e.target.value);
            handleFilterChange();
          }}
        />
      </form>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Region</th>
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
