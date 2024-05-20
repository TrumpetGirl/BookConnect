import axios from 'axios';

export const createAuthor = async (authorData) => {
  try {
    console.log(authorData);
    const response = await axios.post('http://localhost:3000/addAuthor', authorData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
