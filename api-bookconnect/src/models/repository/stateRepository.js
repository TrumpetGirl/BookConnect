import State  from '../model/State.js'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ------ CRUD ------
// OBTENER TODOS LOS ESTADOS
export const findAllStates = async () => {
  try {
    const states = await prisma.state.findMany({ orderBy: { type:'asc' } });
    return states.map(state => new State (state.id, state.type));
  } catch (error) {
    console.error('Error al obtener los estados:', error);
    return []; 
  }
};

// OBTENER ESTADO POR ID
export const findStateById = async (id) => {
  try {
    const state = await prisma.state.findUnique({ where: { id: id } })
    return new State(state.id, state.type)
  } catch (error) {
    console.error(`Error obteniendo el estado ${id}: `, error)
    throw error;
  }
};

// CREAR ESTADO
export async function addState(type) {
  try {
    const newState = await prisma.state.create({ data: { type: type } });
    return new State(newState.id, newState.type)
  } catch (error) {
    console.error('Error añadiendo estado: ', error);
    throw error;
  }
};

// EDITAR ESTADO
export const editState = async (id, type) => {
  try {
    const updateData = { type: type };
    const updatedState = await prisma.state.update({
      where: { id: id },
      data: updateData
    });
    return new State(updatedState.id, updatedState.type);
  } catch (error) {
    console.error('Error editando el estado: ', error);
    throw error;
  }
};

// ELIMINAR ESTADO
export const deleteState = async (id) => {
  try {
    return await prisma.state.delete({ where: { id: id } });
  } catch (error) {
    console.error(`Error eliminando el estado ${id}: `, error);
    throw error;
  }
};
// ------ END CRUD ------

// OBTENER EL NÚMERO TOTAL DE ESTADOS
export const numStates = async () => {
  try {
    return await prisma.state.count();
  } catch (error) {
    console.error('Error al obtener el número total de estados: ', error);
    throw error;
  }
};