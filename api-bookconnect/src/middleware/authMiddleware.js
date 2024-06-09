import { verifyAccessToken } from '../models/repository/authRepository.js'

export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader != 'undefined') {
    const bearer = bearerHeader.split(' ')
    const token = bearer[1]
    if (!token) {
      return res.status(401).json({ message: "Acceso restringido." })
    }
    const result = verifyAccessToken(token)
    if (!result.success) {
      return res.status(401).json({ message: "Acceso restringido." })
    }
    req.loggedUser = result.data
    next()
  } else {
    res.status(401).json({ message: "Acceso restringido." })
  }
};
