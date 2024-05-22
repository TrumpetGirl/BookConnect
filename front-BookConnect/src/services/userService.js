import axios from 'axios';

export const registerUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:3000/user', userData);
      return response.data;
    } catch (error) {
      console.error('Error al agregar al usuario:', error);
      throw error;
    }
  };
