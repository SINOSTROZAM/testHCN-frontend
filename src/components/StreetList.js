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
        const response = await fetch("/api/streets"); // Verifica que esta URL sea correcta
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
        street.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    if (filterRegion) {
      filtered = filtered.filter((street) =>
        street.region.toLowerCase().includes(filterRegion.toLowerCase())
      );
    }

    if (filterProvince) {
      filtered = filtered.filter((street) =>
        street.province.toLowerCase().includes(filterProvince.toLowerCase())
      );
    }

    if (filterCity) {
      filtered = filtered.filter((street) =>
        street.city.toLowerCase().includes(filterCity.toLowerCase())
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
      <h1>Streets List</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Filter by name"
          value={filterName}
          onChange={(e) => {
            setFilterName(e.target.value);
            handleFilterChange();
          }}
        />
        <input
          type="text"
          placeholder="Filter by region"
          value={filterRegion}
          onChange={(e) => {
            setFilterRegion(e.target.value);
            handleFilterChange();
          }}
        />
        <input
          type="text"
          placeholder="Filter by province"
          value={filterProvince}
          onChange={(e) => {
            setFilterProvince(e.target.value);
            handleFilterChange();
          }}
        />
        <input
          type="text"
          placeholder="Filter by city"
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
            <th>Name</th>
            <th>Region</th>
            <th>Province</th>
            <th>City</th>
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
              <td colSpan="4">No streets found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StreetList;
