import { findAllRoles } from '../models/repository/roleRepository.js'

// OBTENER EL NOMBRE DE LOS GÉNEROS
export const getRoles = async (req, res) => {
    try {
        const roles = await findAllRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los roles' });
    }
  };