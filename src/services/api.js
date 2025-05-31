import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

export const petService = {
  // Get all pets
  getAllPets: async () => {
    const response = await api.get('/pets');
    return response.data;
  },

  // Get a single pet by ID
  getPetById: async (id) => {
    const response = await api.get(`/pets/${id}`);
    return response.data;
  },

  // Create a new pet
  createPet: async (petData) => {
    const response = await api.post('/pets', petData);
    return response.data;
  },

  // Update a pet
  updatePet: async (id, petData) => {
    const response = await api.put(`/pets/${id}`, petData);
    return response.data;
  },

  // Adopt a pet
  adoptPet: async (id) => {
    const response = await api.patch(`/pets/${id}/adopt`);
    return response.data;
  },

  // Delete a pet
  deletePet: async (id) => {
    const response = await api.delete(`/pets/${id}`);
    return response.data;
  },

  // Filter pets by mood
  // filterPetsByMood: async (mood) => {
  //   const response = await api.get(`/pets/filter?mood=${mood}`);
  //   return response.data;
  // },
};

export default api;