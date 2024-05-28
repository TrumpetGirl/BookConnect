import User  from '../model/User.js'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// OBTENER TODOS LOS USUARIOS
export const findAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    const arrUsers = users.map(user => new User(user.id, user.username, user.password, 
      user.birth_date, user.role, user.image_path));
    return arrUsers;
  } catch (error) {
    console.error('Error al obtener todos los autores:', error);
    return []; 
  }
};

// CREAR USUARIO
export const registerUser = async (username, password, email, birth_date) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        email: email,
        birth_date: new Date(birth_date), 
        role: 2,
        image_path: 'users/avatar.png'
      }
    });
    const excludeKeys = ['password','birth_date','role','email']
    return Object.fromEntries(
      Object.entries(newUser).filter(([key]) => !excludeKeys.includes(key))
    );
  } catch (error) {
    console.error('Error al registrar al usuario:', error);
    throw error;
  }
};

// OBTENER USUARIOS POR NOMBRE --> EXISTSUSER
export const findUserByIdAndUsername = async (id, username) => {
  try {
    return await prisma.user.findUnique({ where: { id: id, username: username }, select: {id: true, username: true, image_path: true, role: true} });
  } catch (error) {
    console.error('Error obteniendo usuario por id y nombre:', error);
    throw error;
  }
};

// OBTENER USUARIO NOMBRE DE USUARIO
export const findUserByUsername = async (username) => {
  try {
    const user = await prisma.user.findUnique({ where: { username: username }, select: { username: true} });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  } catch (error) {
    console.error('Error obteniendo usuario por id y nombre:', error);
    throw error;
  }
};
