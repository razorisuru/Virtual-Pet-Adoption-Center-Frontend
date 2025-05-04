import React from 'react';
import PetCard from './PetCard';
import LoadingSpinner from './LoadingSpinner';

const PetList = ({ pets, loading, onEdit, onAdopt, onDelete }) => {
  if (loading) {
    return <LoadingSpinner message="Fetching pets..." />;
  }

  if (pets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-100 rounded-lg">
        <div className="text-5xl mb-4">🐾</div>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">No pets found</h3>
        <p className="text-gray-600">
          There are no pets matching your current filters. Try changing your filters or add a new pet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
      {pets.map(pet => (
        <div key={pet._id} className="pet-enter">
          <PetCard 
            pet={pet}
            onEdit={onEdit}
            onAdopt={onAdopt}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default PetList;