import { findAllLists, findListById, addList, editList, deleteList, numLists } from '../models/repository/listRepository.js'

// ------ CRUD ------
// OBTENER TODAS LAS LISTAS
export const getLists = async (req, res) => {
  try {
    const lists = await findAllLists();
    res.status(200).json(lists);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al obtener el listado de listas." });
  }
};

// OBTENER LISTA POR ID
export const getListById = async (req, res) => {
  try {
    const id  = parseInt(req.params.id)
    const list = await findListById(id)
    res.status(200).json(list)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Error al obtener la lista con ID ${req.params.id}.` });
  }
};

// CREAR LISTA
export const createList = async (req, res) => {
  const { name, description, userId } = req.body;
  try {
    const newList = await addList(name, description, userId);
    res.status(201).json(newList);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al crear la lista." });
  }
};

// EDITAR UNA LISTA
export const updateList = async (req, res) => {
  const id  = parseInt(req.params.id)
  const { name, description, userId } = req.body;
  try {
    const editedList = await editList(id, name, description, userId);
    res.status(200).json(editedList);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al editar la lista." });
  }
};

// ELIMINAR LISTA
export const removeList = async (req, res) => {
  const id  = parseInt(req.params.id)
  try {
    const deletedList = await deleteList(id);
    res.status(200).json({ message: `Lista con ID ${id} eliminado correctamente`, deletedList });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al eliminar la lista." });
  }
};
// ------ END CRUD ------

// OBTENER NÚMERO TOTAL DE LISTAS
export const getNumLists = async (req, res) => {
  try {
    const totalLists = await numLists();
    res.status(200).json({ totalLists });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al obtener el número de listas." });
  }
};


