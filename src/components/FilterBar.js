import React from 'react';
import { MOOD_CONFIG } from '../utils/helpers';

const FilterBar = ({ onAddPet, onFilterChange, activeFilter, adoptedFilter, onAdoptedFilterChange }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-gray-800 mr-4">Pet Adoption Center</h2>
          <button 
            onClick={onAddPet} 
            className="btn btn-primary flex items-center gap-1"
          >
            <span>➕</span> Add New Pet
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange(null)}
            className={`btn ${activeFilter === null ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Moods
          </button>
          
          {Object.keys(MOOD_CONFIG).map(mood => (
            <button
              key={mood}
              onClick={() => onFilterChange(mood)}
              className={`btn flex items-center gap-1 ${
                activeFilter === mood 
                  ? `${MOOD_CONFIG[mood].color} ${MOOD_CONFIG[mood].textColor}` 
                  : 'btn-secondary'
              }`}
            >
              <span>{MOOD_CONFIG[mood].icon}</span>
              <span>{mood}</span>
            </button>
          ))}
          
          <select
            value={adoptedFilter}
            onChange={(e) => onAdoptedFilterChange(e.target.value)}
            className="input bg-white"
          >
            <option value="all">All Pets</option>
            <option value="available">Available Only</option>
            <option value="adopted">Adopted Only</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;