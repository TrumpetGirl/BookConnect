// Importamos el repositorio para utilizar sus métodos
import { login, findUsersByRole } from '../models/repository/userRepository.js';

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await login(username, password);
    if (result.success) {
      res.json({ token: result.token });
    } else {
      res.status(401).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función asíncrona que maneja la solicitud (req)--> Id del rol, 
// y la respuesta (res)--> usuarios del rol especificado 
export const getRoleUsers = ( async(req, res)=> {
  try {
    const { roleId } = req.params;
    // Obtenemos la respuesta a través de la función del repositorio,
    // pasándole como parámetro el rol
    const users = await findUsersByRole(roleId);
    res.json(users);
    } catch (error) {
    res.status(500).json({ message: error.message });
  }
});