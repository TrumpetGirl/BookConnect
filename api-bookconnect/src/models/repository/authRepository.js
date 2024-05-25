import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// LOGIN
export const login = async (username, password) => {
    const secretKey = 'secret-password-1234.';
    try {
      const user = await prisma.user.findUnique({ where: { username: username } });
      console.log(user)
      // , select: {id: true, username: true, image_path: true, role: true}
      if (!user) {
        return { success: false, message: 'El nombre de usuario debe ser único' };
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return { success: false, message: 'La contraseña no es correcta' };
      }
      const basicUser = {id: user.id, username: user.username, image_path: user.image_path, role: user.role}
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '3h' });
      return { success: true, user: basicUser, token: token };
    } catch (error) {
      console.error('Error al hacer el login:', error);
      return { success: false, message: 'Error interno del servidor' };
    }
  };