import User  from '../model/User.js'
import Base  from '../model/Base.js'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// ------ CRUD ------
// OBTENER TODOS LOS USUARIOS
export const findAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    const arrUsers = users.map(user => new User(user.id, user.username, user.password, 
      user.email, user.birth_date, user.role, user.image_path));
    return arrUsers;
  } catch (error) {
    console.error('Error al obtener todos los usuarios: ', error);
    return []; 
  }
};

// OBTENER USUARIO POR ID
export const findUserById = async (id) => {
  try {
    return await prisma.user.findUnique({ where: { id: id}});
  } catch (error) {
    console.error('Error obteniendo usuario por id: ', error);
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
    console.error('Error al crear el usuario: ', error);
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
        image_path: 'users/avatar.png'
      },
      select: {
        id: true,
        username:true,
        image_path: true
      }
    });
    return newUser
  } catch (error) {
    console.error('Error al registrar al usuario: ', error);
    throw error;
  }
};

// EDITAR USUARIO
export const editUser = async (username, password, email, birthDate, imageExtension) => {
  let image_path = imageExtension ? `authors/imagenAutor_${id}.${imageExtension}` : null;
  try {
    const updateData = {
      username: username,
      password: password,
      email: email,
      birth_date: new Date(birthDate)
    };
   
    if (image_path) {
      updateData.image_path = image_path;
    } else {
      updateData.image_path = null;
    }
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: updateData
    });

    return updatedUser;
  } catch (error) {
    console.error('Error editando al usuario: ', error);
    throw error;
  }
};

// ELIMINAR USUARIO
export const deleteUser = async (id) => {
  try {
    return await prisma.user.delete({ where: { id: id } });
  } catch (error) {
    console.error(`Error eliminando al usuario ${id}: `, error);
    throw error;
  }
};
// ------ END CRUD ------

// OBTENER TODOS LOS NOMBRES DE LOS USUARIOS
export const findAllUsersSelector = async () => {
  try {
    const users = await prisma.author.findMany({ select: { id: true, username: true }, orderBy: { username:'asc' } });
    return users.map(user => new Base (user.id, user.username));
  } catch (error) {
    console.error('Error al obtener los nombres de los usuarios: ', error);
    throw error; 
  }
 };

// OBTENER EL NÚMERO TOTAL DE USUARIOS
export const numUsers = async () => {
  try {
    return await prisma.user.count();
  } catch (error) {
    console.error('Error al obtener el número total de usarios: ', error);
    throw error;
  }
};

// OBTENER USUARIO POR NOMBRE DE USUARIO
export const findUserByUsername = async (username) => {
  try {
    return await prisma.user.findUnique({ where: { username: username }, select: { id: true, username: true} });
  } catch (error) {
    console.error('Error obteniendo el usuario por su nombre de usuario: ', error);
    throw error;
  }
};

// OBTENER USUARIOS POR ID Y NOMBRE --> EXISTSUSER
export const findUserByIdAndUsername = async (id, username) => {
  try {
    return await prisma.user.findUnique({ where: { id: id, username: username }, select: {id: true, username: true, image_path: true, role: true} });
  } catch (error) {
    console.error('Error obteniendo usuario por id y nombre: ', error);
    throw error;
  }
};






