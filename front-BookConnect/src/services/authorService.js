import axios from 'axios';

export const createAuthor = async (authorData) => {
  try {
    const response = await axios.post('http://localhost:3000/author', authorData);
    return response.data;
  } catch (error) {
    console.error('Error al agregar autor:', error);
    throw error;
  }
};

export const fetchAuthors = async () => {
  try {
    const response = await axios.get('http://localhost:3000/author');
    return response.data;
  } catch (error) {
    console.error('Error fetching authors:', error);
    throw error;
  }
};
