import { findAllUsers, registerUser, findUserByIdAndUsername  } from '../models/repository/userRepository.js';

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

// OBTENER USUARIOS POR NOMBRE
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





