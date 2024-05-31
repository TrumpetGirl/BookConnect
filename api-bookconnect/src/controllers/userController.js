import { findAllUsers, findUserById, makeUser, registerUser, editUser, deleteUser,
  findAllUsersSelector, numUsers, findUserByIdAndUsername, findUserByUsername } from '../models/repository/userRepository.js';

// ------ CRUD ------
//OBTENER TODOS LOS USUARIOS
export const getUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    if (users) 
      res.status(200).json(users)
    else 
      res.status(404).json({ message: 'Lista de usuarios no encontrada' })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// OBTENER USUARIO POR ID
export const getUserById = async (req, res) => {
  try {
    const id  = parseInt(req.params.id);
    const user = await findUserById(id);
    if (user)
      res.status(200).json(user)
    else
    res.status(404).json({ message: `Usuario con id ${req.params.id} no encontrado` })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREAR USUARIO
export const makeNewUser = async (req, res) => {
  const { username, password, email, birth_date, imageExtension } = req.body;
  try {
    const newUser = await makeUser(username, password, email, birth_date, imageExtension);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REGISTRAR USUARIO
export const createUser = async (req, res) => {
  try {
    const { username, password, email, birth_date, image_path } = req.body;
    const newUser = await registerUser(username, password, email, birth_date, image_path);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EDITAR UN USUARIO
export const updateUser = async (req, res) => {
  const id  = parseInt(req.params.id)
  const { username, password, email, birth_date, imageExtension } = req.body;
  try {
    const editedUser = await editUser(username, password, email, birth_date, imageExtension);
    res.status(200).json(editedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ELIMINAR USUARIO
export const removeUser = async (req, res) => {
  const id  = parseInt(req.params.id)
  try {
    const deletedUser = await deleteUser(id);
    res.status(200).json({ message: `Usuario con ID ${id} eliminado correctamente`, deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ------ END CRUD ------

// OBTENER EL NOMBRE DE LOS USUARIOS
export const getUserNames = async (req, res) => {
  try {
      const userNames = await findAllUsersSelector();
      res.status(200).json(userNames);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener los nombres de los usuarios' });
  }
};

// OBTENER NÚMERO TOTAL DE USUARIOS
export const getNumUsers = async (req, res) => {
  try {
    const totalUsers = await numUsers();
    res.json({ totalUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// OBTENER USUARIO POR NOMBRE DE USUARIO
export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await findUserByUsername(username);
    res.status(200).json(user);
  } catch (error) {
    if (error.message === 'Usuario no encontrado') {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      console.error('Error al obtener usuario por nombre: ', error);
      res.status(500).json({ message: 'Error al obtener el usuario por nombre de usuario' });
    }
  }
};

// OBTENER USUARIO POR ID Y NOMBRE DE USUARIO
export const getUserByIdAndUsername = async (req, res) => {
  try {
    const { id, username } = req.body;
    const user = await findUserByIdAndUsername(id, username);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario por id y nombre de usuario.' });
  }
};













