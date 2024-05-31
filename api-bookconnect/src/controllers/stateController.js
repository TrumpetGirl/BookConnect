import { findAllStates, findStateById, addState, editState, deleteState } from '../models/repository/stateRepository.js'

// ------ CRUD ------
// OBTENER TODOS LOS ESTADOS
export const getStates = async (req, res) => {
    try {
      const states = await findAllStates();
      res.status(200).json(states);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// OBTENER ESTADO POR ID
export const getStateById = async (req, res) => {
  try {
    const id  = parseInt(req.params.id)
    const state = await findStateById(id)
    if (state)
      res.status(200).json(state)
    else 
      res.status(404).json({ message: `Estado con id ${req.params.id} no encontrado` })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREAR ESTADO
export const createState = async (req, res) => {
  const { type } = req.body;
  try {
    const newState = await addState(type);
    res.status(201).json(newState);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
};

// ELIMINAR ESTADO
export const removeState = async (req, res) => {
  const id  = parseInt(req.params.id)
  try {
    const deletedState = await deleteState(id);
    res.status(200).json({ message: `Estado con ID ${id} eliminado correctamente`, deletedState });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ------ END CRUD ------




