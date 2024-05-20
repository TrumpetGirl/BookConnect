export const loginUser = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
      return response;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  };

  export const registerUser = async (username, password, birthdate, email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/register', {
        username,
        birthdate,
        email,
        password
      });
      return response;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  };

