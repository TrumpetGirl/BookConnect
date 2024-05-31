import { findAllRoles, findRoleById, addRole, editRole, deleteRole } from '../models/repository/roleRepository.js'

// ------ CRUD ------
// OBTENER TODOS LOS GÉNEROS
export const getRoles = async (req, res) => {
    try {
        const roles = await findAllRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los roles' });
    }
  };

  // OBTENER ROL POR ID
export const getRoleById = async (req, res) => {
    try {
      const id  = parseInt(req.params.id)
      const role = await findRoleById(id)
      if (role)
        res.status(200).json(role)
      else 
        res.status(404).json({ message: `Rol con id ${req.params.id} no encontrado` })
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // CREAR ROL
  export const createRole = async (req, res) => {
    const { type } = req.body;
    try {
      const newRole = await addRole(type);
      res.status(201).json(newRole);
    } catch (error) {
      res.status(500).json({ message: error.message });
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
      res.status(500).json({ message: error.message });
    }
  };
  
  // ELIMINAR ROL
  export const removeRole = async (req, res) => {
    const id  = parseInt(req.params.id)
    try {
      const deletedRole = await deleteRole(id);
      res.status(200).json({ message: `Rol con ID ${id} eliminado correctamente`, deletedRole });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  // ------ END CRUD ------