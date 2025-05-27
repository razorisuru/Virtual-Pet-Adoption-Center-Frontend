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
        <div
          className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-2xl z-50 transition-all duration-500 animate-fade-in"
          role="status"
          aria-live="polite"
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {actionSuccess.message}
          </span>
        </div>
      )}

      {/* Filter bar */}
      <div className="mb-8">
        <FilterBar
          onAddPet={handleAddPet}
          onFilterChange={setMoodFilter}
          activeFilter={moodFilter}
          adoptedFilter={adoptedFilter}
          onAdoptedFilterChange={setAdoptedFilter}
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8 flex items-center gap-3 shadow">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-1.414 1.414M6.343 17.657l-1.414-1.414M5.636 5.636l1.414 1.414M17.657 17.657l1.414-1.414M12 8v4m0 4h.01" />
          </svg>
          <div>
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        </div>
      )}

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <svg className="animate-spin h-10 w-10 text-blue-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="ml-4 text-lg text-blue-700">Loading pets...</span>
        </div>
      )}

      {/* Pet list */}
      {!loading && (
        <div className="transition-all duration-300">
          <PetList
            pets={pets}
            loading={loading}
            onEdit={handleEditPet}
            onAdopt={handleAdoptPet}
            onDelete={handleOpenDeleteConfirmation}
          />
        </div>
      )}

      {/* Add/Edit Pet Modal */}
      <PetModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitPet}
        pet={currentPet}
      />

      {/* Confirmation Modal for Delete */}
      {confirmationModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-all">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Confirm Action</h3>
            <p className="mb-6 text-gray-700">{confirmationModal.message}</p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition"
                onClick={() => setConfirmationModal({ ...confirmationModal, show: false })}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold transition"
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