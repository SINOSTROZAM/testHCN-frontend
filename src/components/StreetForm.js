import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const StreetForm = () => {
  // Estados para manejar los datos
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [nameStreet, setNameStreet] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentStreetId, setCurrentStreetId] = useState(null);
  const [error, setError] = useState("");

  // Cargar regiones al montar el componente
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get("/regions");
        setRegions(response.data);
      } catch (error) {
        console.error("Error al obtener regiones:", error);
        setError("Error al obtener regiones");
      }
    };
    fetchRegions();
  }, []);

  // Cargar provincias cuando se selecciona una región
  useEffect(() => {
    if (selectedRegion) {
      const fetchProvinces = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/provinces/${selectedRegion}`
          );
          setProvinces(response.data);
        } catch (error) {
          console.error("Error al obtener provincias:", error);
          setError("Error al obtener provincias");
        }
      };
      fetchProvinces();
    } else {
      setProvinces([]);
      setSelectedProvince("");
    }
  }, [selectedRegion]);

  // Cargar ciudades cuando se selecciona una provincia
  useEffect(() => {
    if (selectedProvince) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/cities/${selectedProvince}`
          );
          setCities(response.data);
        } catch (error) {
          console.error("Error al obtener ciudades:", error);
          setError("Error al obtener ciudades");
        }
      };
      fetchCities();
    } else {
      setCities([]);
      setSelectedCity("");
    }
  }, [selectedProvince]);

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = {
        name: nameStreet,
        region_id: selectedRegion,
        province_id: selectedProvince,
        city_id: selectedCity,
      };
      if (isEditing) {
        await axios.put(`/streets/${currentStreetId}`, data);
        alert("Calle actualizada con éxito");
      } else {
        await axios.post("/streets", data);
        alert("Calle añadida con éxito");
      }
      // Limpiar el formulario después de enviar
      resetForm();
    } catch (error) {
      console.error("Error al guardar la calle:", error);
      setError("Error al guardar la calle");
    }
  };

  // Manejo de la edición de calles
  const handleEdit = (street) => {
    setIsEditing(true);
    setCurrentStreetId(street.id);
    setNameStreet(street.nombre);
    setSelectedRegion(street.region_id);
    setSelectedProvince(street.province_id);
  };

  // Manejo del restablecimiento del formulario
  const resetForm = () => {
    setIsEditing(false);
    setCurrentStreetId(null);
    setNameStreet("");
    setSelectedRegion("");
    setSelectedProvince("");
    setSelectedCity("");
  };

  return (
    <div>
      <h2>{isEditing ? "Editar Calle" : "Agregar Calle"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de Calle:
          <input
            type="text"
            value={nameStreet}
            onChange={(e) => setNameStreet(e.target.value)}
            required
          />
        </label>

        <label>
          Región:
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">Selecciona una región</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Provincia:
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            disabled={!selectedRegion}
          >
            <option value="">Selecciona una provincia</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Ciudad:
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedProvince}
          >
            <option value="">Selecciona una ciudad</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">{isEditing ? "Actualizar" : "Guardar"}</button>
        <button type="button" onClick={resetForm}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default StreetForm;
