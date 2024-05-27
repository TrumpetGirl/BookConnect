import { findAllUsers, registerUser, findUserByIdAndUsername, findUserByUsername  } from '../models/repository/userRepository.js';

//OBTENER TODOS LOS USUARIOS
export const getUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// CREAR USUARIO
export const createUser = async (req, res) => {
  try {
    const { username, password, email, birth_date, image_path } = req.body;
    const user = await registerUser(username, password, email, birth_date, image_path);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// OBTENER USUARIO POR ID Y NOMBRE DE USUARIO
export const getUserByIdAndUsername = async (req, res) => {
  try {
    const { id, username } = req.body;
    console.log(id + " - " + username)
    const user = await findUserByIdAndUsername(id, username);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// OBTENER USUARIO NOMBRE DE USUARIO
export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await findUserByUsername(username);
    res.json(user);
  } catch (error) {
    if (error.message === 'Usuario no encontrado') {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      console.error('Error al obtener usuario por nombre:', error);
      res.status(500).json({ message: 'Error al obtener usuario nombre' });
    }
  }
};





