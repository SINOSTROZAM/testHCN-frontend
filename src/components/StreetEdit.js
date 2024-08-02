import React, { useState, useEffect } from "react";
import axios from "axios";

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  select: {
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  input: {
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "10px 15px",
    margin: "5px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "16px",
  },
  buttonSecondary: {
    backgroundColor: "#6c757d",
  },
  error: {
    color: "red",
    marginBottom: "15px",
  },
};

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
    <div style={styles.container}>
      <h2>Editar Calle & Eliminar Calle</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Región:</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            style={styles.select}
          >
            <option value="">Selecciona una Región</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Provincia:</label>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            disabled={!selectedRegion}
            style={styles.select}
          >
            <option value="">Selecciona una Provincia</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Ciudad:</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedProvince}
            style={styles.select}
          >
            <option value="">Selecciona una Ciudad</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Calle:</label>
          <select
            value={selectedStreet}
            onChange={handleStreetChange}
            disabled={!selectedCity}
            style={styles.select}
          >
            <option value="">Selecciona una Calle</option>
            {streets.map((street) => (
              <option key={street.id} value={street.id}>
                {street.name}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nuevo Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!selectedStreet}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button} disabled={!selectedStreet}>
          Actualizar
        </button>
        <button
          type="button"
          onClick={handleDelete}
          style={{ ...styles.button, ...styles.buttonSecondary }}
          disabled={!selectedStreet}
        >
          Eliminar
        </button>
      </form>
    </div>
  );
};

export default StreetEdit;
