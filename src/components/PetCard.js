import React from 'react';
import Badge from './Badge';
import { formatDate, getPetImage } from '../utils/helpers';

const PetCard = ({ pet, onEdit, onAdopt, onDelete }) => {
  const isAdopted = pet.adopted;
  
  return (
    <div className={`card pet-card ${isAdopted ? 'border-purple-300 border-2' : ''}`}>
      <div className="relative overflow-hidden" style={{ height: '180px' }}>
        <img 
          src={getPetImage(pet.species)}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
        {isAdopted && (
          <div className="absolute top-0 right-0 bg-purple-500 text-white px-2 py-1 text-xs font-bold transform rotate-12 translate-x-2 -translate-y-0">
            Adopted!
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold">{pet.name}</h3>
          <Badge type="mood" text={pet.mood} />
        </div>
        
        <div className="mt-2 space-y-1 text-gray-600">
          <p><span className="font-medium">Species:</span> {pet.species}</p>
          <p><span className="font-medium">Age:</span> {pet.age} {pet.age === 1 ? 'year' : 'years'}</p>
          <p><span className="font-medium">Personality:</span> {pet.personality}</p>
          {isAdopted && (
            <p><span className="font-medium">Adopted on:</span> {formatDate(pet.adoption_date)}</p>
          )}
        </div>
        
        <div className="mt-4 flex gap-2">
          <button 
            onClick={() => onEdit(pet)} 
            className="btn btn-secondary text-sm flex-1"
            disabled={isAdopted}
          >
            Edit
          </button>
          {!isAdopted ? (
            <button 
              onClick={() => onAdopt(pet._id)} 
              className="btn btn-primary text-sm flex-1"
            >
              Adopt
            </button>
          ) : (
            <button 
              disabled 
              className="btn bg-purple-200 text-purple-700 cursor-not-allowed text-sm flex-1"
            >
              Adopted
            </button>
          )}
          <button 
            onClick={() => onDelete(pet._id)} 
            className="btn btn-danger text-sm flex-none w-10"
            title="Delete pet"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;