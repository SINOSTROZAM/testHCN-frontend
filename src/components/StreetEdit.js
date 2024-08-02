import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const StreetEdit = () => {
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [streets, setStreets] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedStreet, setSelectedStreet] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener regiones al montar el componente
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get("/api/regions");
        setRegions(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  // Obtener provincias basadas en la región seleccionada
  useEffect(() => {
    if (selectedRegion) {
      const fetchProvinces = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/provinces/${selectedRegion}`
          );
          setProvinces(response.data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchProvinces();
    }
  }, [selectedRegion]);

  // Obtener ciudades basadas en la provincia seleccionada
  useEffect(() => {
    if (selectedProvince) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/cities/${selectedProvince}`
          );
          setCities(response.data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchCities();
    }
  }, [selectedProvince]);

  // Obtener calles basadas en la ciudad seleccionada
  useEffect(() => {
    if (selectedCity) {
      const fetchStreets = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/streets/${selectedCity}`
          );
          setStreets(response.data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchStreets();
    }
  }, [selectedCity]);

  // Manejar cambio de calle seleccionada
  const handleStreetChange = (e) => {
    const streetId = e.target.value;
    setSelectedStreet(streetId);
    const street = streets.find((s) => s.id === streetId);
    setName(street ? street.name : "");
  };

  // Manejar envío del formulario para actualizar la calle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/streets/${selectedStreet}`, { name });
      alert("Street updated successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  // Manejar eliminación de la calle
  const handleDelete = async () => {
    if (window.confirm("Esta seguro de eliminar esta calle?")) {
      try {
        await axios.delete(`/api/streets/${selectedStreet}`);
        alert("Calle eliminada correctamente");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h2>Editar y Eliminar Calle</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Región:</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="select"
          >
            <option value="">Selecciona una Región</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="label">Provincia:</label>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            disabled={!selectedRegion}
            className="select"
          >
            <option value="">Selecciona una Provincia</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="label">Ciudad:</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedProvince}
            className="select"
          >
            <option value="">Selecciona una Ciudad</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="label">Calle:</label>
          <select
            value={selectedStreet}
            onChange={handleStreetChange}
            disabled={!selectedCity}
            className="select"
          >
            <option value="">Selecciona una Calle</option>
            {streets.map((street) => (
              <option key={street.id} value={street.id}>
                {street.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="label">Nuevo Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!selectedStreet}
            className="input"
          />
        </div>
        <button type="submit" className="button" disabled={!selectedStreet}>
          Actualizar
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="button button-secondary"
          disabled={!selectedStreet}
        >
          Eliminar
        </button>
      </form>
    </div>
  );
};

export default StreetEdit;
