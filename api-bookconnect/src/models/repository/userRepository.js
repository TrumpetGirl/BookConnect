import User  from '../model/User.js'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import BasePath  from '../model/BasePath.js'
import Base  from '../model/Base.js'

const prisma = new PrismaClient();

// OBTENER TODOS LOS USUARIOS
export const findAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    const arrUsers = users.map(user => new User(user.id, user.username, user.password, 
      user.email, user.birth_date, user.role, user.image_path));
    return arrUsers;
  } catch (error) {
    console.error('Error al obtener todos los autores:', error);
    return []; 
  }
};

// OBTENER USUARIO POR ID
export const findUserById = async (id) => {
  try {
    return await prisma.user.findUnique({ where: { id: id}});
  } catch (error) {
    console.error('Error obteniendo usuario por id:', error);
    throw error;
  }
};

// OBTENER USUARIOS POR ID Y NOMBRE --> EXISTSUSER
export const findUserByIdAndUsername = async (id, username) => {
  try {
    return await prisma.user.findUnique({ where: { id: id, username: username }, select: {id: true, username: true, image_path: true, role: true} });
  } catch (error) {
    console.error('Error obteniendo usuario por id y nombre:', error);
    throw error;
  }
};

// OBTENER USUARIO POR NOMBRE DE USUARIO
export const findUserByUsername = async (username) => {
  try {
    return await prisma.user.findUnique({ where: { username: username }, select: { id: true, username: true} });
  } catch (error) {
    console.error('Error obteniendo el nombre de usuario:', error);
    throw error;
  }
};

// REGISTRAR USUARIO 
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
      },
      select: {
        id: true,
        username:true,
        image_path: true
      }

    });
    // const excludeKeys = ['password','birth_date','role','email']
    // return Object.fromEntries(
    //   Object.entries(newUser).filter(([key]) => !excludeKeys.includes(key))
    // );
    return newUser
  } catch (error) {
    console.error('Error al registrar al usuario:', error);
    throw error;
  }
};

// CREAR USUARIO 
export const makeUser = async (username, password, email, birth_date, imageExtension) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        email: email,
        birth_date: new Date(birth_date), 
        role: role,
      }
    });
    if (imageExtension) {
      const updateUser = await prisma.user.update({
        where: {
          id: newUser.id
        },
        data: {
          image_path: "users/imagenUsuario_" + newUser.id + "." + imageExtension
        }
      })
      return updateUser;
    } else {
      return newUser
    }
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};


