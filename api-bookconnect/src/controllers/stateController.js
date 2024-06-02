import { findAllStates, findStateById, addState, editState, deleteState, numStates } from '../models/repository/stateRepository.js'

// ------ CRUD ------
// OBTENER TODOS LOS ESTADOS
export const getStates = async (req, res) => {
  try {
    const states = await findAllStates();
    res.status(200).json(states);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al obtener el listado de estados." });
  }
};

// OBTENER ESTADO POR ID
export const getStateById = async (req, res) => {
  try {
    const id  = parseInt(req.params.id)
    const state = await findStateById(id)
    res.status(200).json(state)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Error al obtener el estado con ID ${req.params.id}.` });
  }
};

// CREAR ESTADO
export const createState = async (req, res) => {
  const { type } = req.body;
  try {
    const newState = await addState(type);
    res.status(201).json(newState);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al crear el estado." });
  }
};

// EDITAR UN ESTADO
export const updateState = async (req, res) => {
  const id  = parseInt(req.params.id)
  const { type } = req.body;
  try {
    const editedState = await editState(id, type);
    res.status(200).json(editedState);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al editar el estado." });
  }
};

// ELIMINAR ESTADO
export const removeState = async (req, res) => {
  const id  = parseInt(req.params.id)
  try {
    const deletedState = await deleteState(id);
    res.status(200).json({ message: `Estado con ID ${id} eliminado correctamente`, deletedState });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al eliminar el estado." });
  }
};
// ------ END CRUD ------

// OBTENER NÚMERO TOTAL DE ESTADOS
export const getNumStates = async (req, res) => {
  try {
    const totalStates = await numStates();
    res.status(200).json({ totalStates });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al obtener el número de estados." });
  }
};



