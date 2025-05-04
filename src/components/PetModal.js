import React, { useState, useEffect } from 'react';
import { PET_SPECIES, PET_PERSONALITIES } from '../utils/helpers';

const PetModal = ({ isOpen, onClose, onSubmit, pet = null }) => {
  const isEditMode = !!pet;
  
  const [formData, setFormData] = useState({
    name: '',
    species: 'Dog',
    age: 1,
    personality: 'Friendly'
  });
  
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (pet) {
      setFormData({
        name: pet.name || '',
        species: pet.species || 'Dog',
        age: pet.age || 1,
        personality: pet.personality || 'Friendly'
      });
    } else {
      // Reset form for new pet
      setFormData({
        name: '',
        species: 'Dog',
        age: 1,
        personality: 'Friendly'
      });
    }
    setErrors({});
  }, [pet, isOpen]);
  
  if (!isOpen) return null;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value, 10) || 0 : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (formData.age <= 0) newErrors.age = 'Age must be greater than 0';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({ 
        ...formData,
        ...(isEditMode && { id: pet._id })
      });
    }
  };
  
  // Handle click outside to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className="modal-backdrop"
      onClick={handleBackdropClick}
    >
      <div 
        className="modal-content"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">
          {isEditMode ? 'Edit Pet' : 'Add New Pet'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="label">Pet Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter pet name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="species" className="label">Species</label>
            <select
              id="species"
              name="species"
              value={formData.species}
              onChange={handleChange}
              className="input"
            >
              {PET_SPECIES.map(species => (
                <option key={species} value={species}>{species}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="age" className="label">Age (years)</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="0"
              step="1"
              className={`input ${errors.age ? 'border-red-500' : ''}`}
            />
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
          </div>
          
          <div>
            <label htmlFor="personality" className="label">Personality</label>
            <select
              id="personality"
              name="personality"
              value={formData.personality}
              onChange={handleChange}
              className="input"
            >
              {PET_PERSONALITIES.map(personality => (
                <option key={personality} value={personality}>{personality}</option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {isEditMode ? 'Save Changes' : 'Add Pet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetModal;