import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import FilterBar from '../components/FilterBar';
import PetList from '../components/PetList';
import PetModal from '../components/PetModal';
import { petService } from '../services/api';
import { generateConfetti, delay } from '../utils/helpers';

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [moodFilter, setMoodFilter] = useState(null);
  const [adoptedFilter, setAdoptedFilter] = useState('all');

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);
  const [actionSuccess, setActionSuccess] = useState({ message: '', show: false });

  // Confirmation modal states
  const [confirmationModal, setConfirmationModal] = useState({
    show: false,
    petId: null,
    message: '',
    action: null
  });

  const fetchPets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Get all pets first
      const data = await petService.getAllPets();
      
      let filteredData = [...data];
      
      // Apply mood filter locally
      if (moodFilter) {
        filteredData = filteredData.filter(pet => pet.mood === moodFilter);
      }
      
      // Apply adopted filter
      if (adoptedFilter === 'available') {
        filteredData = filteredData.filter(pet => !pet.adopted);
      } else if (adoptedFilter === 'adopted') {
        filteredData = filteredData.filter(pet => pet.adopted);
      }
      
      setPets(filteredData);
    } catch (err) {
      console.error('Error fetching pets:', err);
      setError('Failed to load pets. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [moodFilter, adoptedFilter]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  // Show success message and hide after delay
  const showSuccessMessage = async (message) => {
    setActionSuccess({ message, show: true });
    await delay(3000);
    setActionSuccess({ message: '', show: false });
  };

  // Handle opening modal for adding a new pet
  const handleAddPet = () => {
    setCurrentPet(null); // Ensure we're not in edit mode
    setModalOpen(true);
  };

  // Handle opening modal for editing an existing pet
  const handleEditPet = (pet) => {
    setCurrentPet(pet);
    setModalOpen(true);
  };

  // Handle form submission (add/edit)
  const handleSubmitPet = async (petData) => {
    setLoading(true);
    setModalOpen(false);
    try {
      if (petData.id) {
        // Update existing pet
        await petService.updatePet(petData.id, petData);
        await showSuccessMessage(`${petData.name} has been updated!`);
      } else {
        // Add new pet
        await petService.createPet(petData);
        await showSuccessMessage(`${petData.name} has been added!`);
      }
      fetchPets();
    } catch (err) {
      console.error('Error submitting pet:', err);
      setError('Failed to save pet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle adopting a pet
  const handleAdoptPet = async (petId) => {
    setLoading(true);
    try {
      await petService.adoptPet(petId);
      generateConfetti(); // Celebrate the adoption!
      await showSuccessMessage('Congratulations on your new adoption! 🎉');
      fetchPets();
    } catch (err) {
      console.error('Error adopting pet:', err);
      setError('Failed to adopt pet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle opening delete confirmation
  const handleOpenDeleteConfirmation = (petId) => {
    const petToDelete = pets.find(pet => pet.id === petId);
    setConfirmationModal({
      show: true,
      petId,
      message: `Are you sure you want to remove ${petToDelete?.name} from the adoption center?`,
      action: 'delete'
    });
  };

  // Handle deleting a pet
  const handleDeletePet = async (petId) => {
    setLoading(true);
    try {
      await petService.deletePet(petId);
      await showSuccessMessage('Pet has been removed from the adoption center.');
      setConfirmationModal({ show: false, petId: null, message: '', action: null });
      fetchPets();
    } catch (err) {
      console.error('Error deleting pet:', err);
      setError('Failed to delete pet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Success message toast */}
      {actionSuccess.show && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-bounce-slow">
          {actionSuccess.message}
        </div>
      )}
      
      {/* Filter bar */}
      <FilterBar 
        onAddPet={handleAddPet}
        onFilterChange={setMoodFilter}
        activeFilter={moodFilter}
        adoptedFilter={adoptedFilter}
        onAdoptedFilterChange={setAdoptedFilter}
      />
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      
      {/* Pet list */}
      <PetList 
        pets={pets}
        loading={loading}
        onEdit={handleEditPet}
        onAdopt={handleAdoptPet}
        onDelete={handleOpenDeleteConfirmation}
      />
      
      {/* Add/Edit Pet Modal */}
      <PetModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitPet}
        pet={currentPet}
      />
      
      {/* Confirmation Modal for Delete */}
      {confirmationModal.show && (
        <div className="modal-backdrop">
          <div className="modal-content max-w-sm">
            <h3 className="text-xl font-bold mb-4">Confirm Action</h3>
            <p className="mb-6">{confirmationModal.message}</p>
            <div className="flex justify-end space-x-2">
              <button 
                className="btn btn-secondary"
                onClick={() => setConfirmationModal({...confirmationModal, show: false})}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => handleDeletePet(confirmationModal.petId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default HomePage;