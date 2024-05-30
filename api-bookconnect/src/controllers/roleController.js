import { findAllRolesSelector } from '../models/repository/roleRepository.js'

// OBTENER EL NOMBRE DE LOS GÉNEROS
export const getRolesSelector = async (req, res) => {
    try {
        const roleNames = await findAllRolesSelector();
        res.status(200).json(roleNames);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los roles' });
    }
  };