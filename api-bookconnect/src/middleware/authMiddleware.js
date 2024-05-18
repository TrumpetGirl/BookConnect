// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key';

export const verifyToken = (req, res, next) => {
  console.log(req);
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
};
