import { findAllUsers, registerUser, findUserById, findUserByIdAndUsername, findUserByUsername, makeUser  } from '../models/repository/userRepository.js';

//OBTENER TODOS LOS USUARIOS
export const getUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// OBTENER USUARIO POR ID
export const getUserById = async (req, res) => {
  try {
    const id  = parseInt(req.params.id);
    const user = await findUserById(id);
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
      res.status(500).json({ message: 'Error al obtener el nombre de usuario' });
    }
  }
};

// REGISTRAR USUARIO
export const createUser = async (req, res) => {
  try {
    const { username, password, email, birth_date, image_path } = req.body;
    const user = await registerUser(username, password, email, birth_date, image_path);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREAR UN NUEVO USUARIO
export const makeNewUser = async (req, res) => {
  const { username, password, email, birth_date, imageExtension } = req.body;
  try {
    const newUser = await makeUser(username, password, email, birth_date, imageExtension);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};







