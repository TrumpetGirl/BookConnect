import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

import LoggedUser from '../view/LoggedUser.js'

const prisma = new PrismaClient()

const secretKey = 'secret-password-1234.'

// LOGIN
export const login = async (username, password) => {
  
  try {
    const user = username.includes('@') ? await prisma.user.findUnique({ where: { email: username }, include: { role: true } }) : await prisma.user.findUnique({ where: { username: username }, include: { role: true } })
    if (!user) {
      return { success: false, message: 'El usuario no está registrado.' }
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return { success: false, message: 'La contraseña es incorrecta.' }
    }
    
    const basicUser = new LoggedUser(user.id, user.username, user.image_path, user.role.type, user.role.id)
    const token = generateAccessToken(basicUser)
    return { success: true, user: basicUser, token }
  } catch (error) {
    return { success: false, message: 'Error interno del servidor.' }
  }
};

const generateAccessToken = (user) => {
  const u = {id: user.id, username: user.username, image_path: user.image_path, role: user.role, roleId: user.roleId}
  return jwt.sign(u, secretKey, { expiresIn: '3h' })
}

export const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey)
    return { success: true, data: decoded }
  } catch (error) {
    return { success: false, message: "Error interno del servidor." }
  }
}