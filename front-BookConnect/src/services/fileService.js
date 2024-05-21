import axios from 'axios';

export const uploadImage = async (formData) => {
  try {
    const response = await axios.post('http://localhost:3000/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data;
  } catch (error) {
    console.error('Error al agregar autor:', error);
    throw error;
  }
};

export const downloadImage = async (imageUrl) => {
  try {
    const response = await axios.get('http://localhost:3000/file/download/' + imageUrl)
    return response.data;
  } catch (error) {
    console.error('Error al descargar imagen:', error);
    throw error;
  }
};