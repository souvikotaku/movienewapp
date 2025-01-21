import React from "react";
import "../styles/FilterPanel.css"; // Optional, if you have specific styles

const FilterPanel = ({ filters, setFilters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className="filter-panel">
      <h2>Filter Movies</h2>
      <input
        type="text"
        name="title"
        placeholder="Search by title"
        value={filters.title}
        onChange={handleInputChange}
      />
      <select name="genre" value={filters.genre} onChange={handleInputChange}>
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        <option value="Comedy">Comedy</option>
      </select>
      <select name="year" value={filters.year} onChange={handleInputChange}>
        <option value="">All Years</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
      </select>
    </div>
  );
};

export default FilterPanel;
