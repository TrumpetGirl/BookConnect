import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'

import LoggedUser from '../../views/LoggedUser.js'

const prisma = new PrismaClient()

// LOGIN
export const login = async (username, password) => {
    const secretKey = 'secret-password-1234.';
    try {
      const user = await prisma.user.findUnique({ where: { username: username } });
      
      if (!user) {
        return { success: false, message: 'El usuario no está registrado' };
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return { success: false, message: 'La contraseña es incorrecta' };
      }
      const basicUser = new LoggedUser(user.id, user.username, user.image_path, user.roleId)
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '3h' });
      return { success: true, user: basicUser, token: token };
    } catch (error) {
      console.error('Error al hacer el login:', error);
      return { success: false, message: 'Error interno del servidor' };
    }
  };