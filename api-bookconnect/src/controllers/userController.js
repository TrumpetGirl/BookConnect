import { findAllUsers, findUserById, makeUser, registerUser, editUser, deleteUser,
  findAllUsersSelector, numUsers, findUsersByUsername, findUserByUsername } from '../models/repository/userRepository.js';

// ------ CRUD ------
//OBTENER TODOS LOS USUARIOS
export const getUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al obtener el listado de usuarios." });
  }
}

// OBTENER USUARIO POR ID
export const getUserById = async (req, res) => {
  try {
    const id  = parseInt(req.params.id);
    const user = await findUserById(id);
    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Error al obtener el usuario con ID ${req.params.id}.` });
  }
};

// CREAR USUARIO
export const makeNewUser = async (req, res) => {
  const { username, password, email, birth_date, imageExtension, roleId } = req.body;
  try {
    const newUser = await makeUser(username, password, email, birth_date, imageExtension, roleId);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al crear el estado." });
  }
};

// REGISTRAR USUARIO
export const createUser = async (req, res) => {
  try {
    const { username, password, email, birth_date } = req.body;
    const newUser = await registerUser(username, password, email, birth_date);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al registrar el usuario."});
  }
};

// EDITAR UN USUARIO
export const updateUser = async (req, res) => {
  const id  = parseInt(req.params.id)
  const { username, email, birth_date, imageExtension, imageChange } = req.body;
  try {
    const editedUser = await editUser(username, email, birth_date, imageExtension, imageChange);
    res.status(200).json(editedUser);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al editar el usuario." });
  }
};

// ELIMINAR USUARIO
export const removeUser = async (req, res) => {
  const id  = parseInt(req.params.id)
  try {
    const deletedUser = await deleteUser(id);
    res.status(200).json({ message: `Usuario con ID ${id} eliminado correctamente.`, deletedUser });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al eliminar el usuario." });
  }
};
// ------ END CRUD ------

// OBTENER EL NOMBRE DE LOS USUARIOS
export const getUserNames = async (req, res) => {
  try {
    const userNames = await findAllUsersSelector();
    res.status(200).json(userNames);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener los nombres de los usuarios.' });
  }
};

// OBTENER NÚMERO TOTAL DE USUARIOS
export const getNumUsers = async (req, res) => {
  try {
    const totalUsers = await numUsers();
    res.status(200).json({ totalUsers });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al obtener el número de usuarios." });
  }
};

// OBTENER USUARIOS POR NOMBRE DE USUARIO
export const getUsersByUsername = async (req, res) => {
  const { search } = req.body;
  try {
    const users = await findUsersByUsername(search);
    res.status(200).json(users);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener el usuario por nombre de usuario.' });
  }
};

// OBTENER USUARIO POR NOMBRE DE USUARIO
export const getUserByUsername = async (req, res, next) => {
  try {
    const { username } = req.body
    const user = await findUserByUsername(username)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}













