import { login } from '../models/repository/authRepository.js'

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await login(username, password);
    if (result.success) {
      res.json({ user: result.user, token: result.token });
    } else {
      res.status(401).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};