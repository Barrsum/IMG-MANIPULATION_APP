import React from 'react';

const FilterButtons = ({ setCurrentFilter }) => {
  const filters = ['None', 'Grayscale', 'Sepia', 'Invert', 'Blur', 'Brightness', 'Contrast'];

  return (
    <div className="filter-buttons">
      <h2>Filters</h2>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setCurrentFilter(filter.toLowerCase())}
          className="button"
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;