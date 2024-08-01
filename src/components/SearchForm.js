import React from "react";

// Definir el componente SearchForm
const SearchForm = ({ filters, onFilterChange }) => {
  // Manejar el cambio de cada campo del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    onFilterChange({ name, value });
  };

  return (
    <form>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Region:
          <input
            type="text"
            name="region"
            value={filters.region}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Province:
          <input
            type="text"
            name="province"
            value={filters.province}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <button
          type="button"
          onClick={() => onFilterChange({ name: "", value: "" })}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
