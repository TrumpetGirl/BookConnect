import { findAllRolesSelector } from '../models/repository/roleRepository.js'

// OBTENER EL NOMBRE DE LOS GÉNEROS
export const getRolesSelector = async (req, res) => {
    try {
        const genreNames = await findAllRolesSelector();
        res.status(200).json(genreNames);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los nombres de los roles' });
    }
  };