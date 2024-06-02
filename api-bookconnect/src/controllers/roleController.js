import { findAllRoles, findRoleById, addRole, editRole, deleteRole, numRoles } from '../models/repository/roleRepository.js'

// ------ CRUD ------
// OBTENER TODOS LOS GÉNEROS
export const getRoles = async (req, res) => {
  try {
    const roles = await findAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener los roles' });
  }
};

  // OBTENER ROL POR ID
export const getRoleById = async (req, res) => {
  try {
    const id  = parseInt(req.params.id)
    const role = await findRoleById(id)
    res.status(200).json(role)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Error al obtener el rol con ID ${req.params.id}.` });
  }
};
  
// CREAR ROL
export const createRole = async (req, res) => {
  const { type } = req.body;
  try {
    const newRole = await addRole(type);
    res.status(201).json(newRole);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al crear el rol." });
  }
};
  
// EDITAR UN ROL
export const updateRole = async (req, res) => {
  const id  = parseInt(req.params.id)
  const { type } = req.body;
  try {
    const editedRole = await editRole(id, type);
    res.status(200).json(editedRole);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al editar el rol." });
  }
};
  
// ELIMINAR ROL
export const removeRole = async (req, res) => {
  const id  = parseInt(req.params.id)
  try {
    const deletedRole = await deleteRole(id);
    res.status(200).json({ message: `Rol con ID ${id} eliminado correctamente`, deletedRole });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al eliminar el rol." });
  }
};
// ------ END CRUD ------

// OBTENER NÚMERO TOTAL DE ROLES
export const getNumRoles = async (req, res) => {
  try {
    const totalRoles = await numRoles();
    res.status(200).json({ totalRoles });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al obtener el número de roles." });
  }
};