import axios from 'axios';

export const createAuthor = async (authorData) => {
  try {
    const response = await axios.post('http://localhost:3000/addAuthors', authorData);

    // {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // }
    return response.data;
  } catch (error) {
    console.error('Error al agregar autor:', error);
    throw error;
  }
};

export const fetchAuthors = async () => {
  try {
    const response = await axios.get('http://localhost:3000/authors');
    return response.data;
  } catch (error) {
    console.error('Error fetching authors:', error);
    throw error;
  }
};
