import { findAllLists, findListById, addList, editList, deleteList } from '../models/repository/listRepository.js'

// ------ CRUD ------
// OBTENER TODAS LAS LISTAS
export const getLists = async (req, res) => {
    try {
      const lists = await findAllLists();
      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// OBTENER LISTA POR ID
export const getListById = async (req, res) => {
  try {
    const id  = parseInt(req.params.id)
    const list = await findListById(id)
    if (list)
      res.status(200).json(list)
    else 
      res.status(404).json({ message: `Lista con id ${req.params.id} no encontrado` })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREAR LISTA
export const createList = async (req, res) => {
  const { name, description, user } = req.body;
  try {
    const newList = await addList(name, description, user);
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EDITAR UNA LISTA
export const updateList = async (req, res) => {
  const id  = parseInt(req.params.id)
  const { name, description, user } = req.body;
  try {
    const editedList = await editList(id, name, description, user);
    res.status(200).json(editedList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ELIMINAR LISTA
export const removeList = async (req, res) => {
  const id  = parseInt(req.params.id)
  try {
    const deletedList = await deleteList(id);
    res.status(200).json({ message: `Lista con ID ${id} eliminado correctamente`, deletedList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ------ END CRUD ------




