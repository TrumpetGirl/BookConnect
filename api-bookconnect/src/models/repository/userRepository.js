import Base  from '../view/Base.js'
import SearchElement  from '../view/SearchElement.js'
import UserProfile from '../view/UserProfile.js'
import LoggedUser from '../view/LoggedUser.js'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// ------ CRUD ------
// OBTENER TODOS LOS USUARIOS
export const findAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        image_path: true,
        role: true
      },
      orderBy: { username: "asc" }
    });
    const arrUsers = users.map(user => new LoggedUser(user.id, user.username, user.image_path, user.role.type, user.role.id));
    return { success: true, users: arrUsers }
  } catch (error) {
    return { success: false, message: 'Error interno del servidor.' }
  }
};

// OBTENER USUARIO POR ID
export const findUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: id},
      select: {
        id: true,
        username: true,
        email: true,
        birth_date: true,
        image_path: true,
        role: true
      }
    });
    return new UserProfile (user.id, user.username, user.email, user.birth_date, user.image_path, user.role.id, user.role.type)
  } catch (error) {
    return { success: false, message: 'Error interno del servidor.' }
  }
};

// CREAR USUARIO 
export const makeUser = async (username, password, email, birth_date, imageExtension, roleId) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        email: email,
        birth_date: new Date(birth_date),
        role: { connect: { id: roleId } },
        lists: {
          create: {
            name: "Favoritos",
            description: "Lista de favoritos del usuario"
          }
        }
      },
      include: { role: true }
    });
    if (imageExtension) {
      const updateUser = await prisma.user.update({
        where: { id: newUser.id },
        data: { image_path: "users/imagenUsuario_" + newUser.id + "_" + new Date().getTime() + "." + imageExtension },
        include: { role: true }
      })
      return {success: true, user: new LoggedUser(updateUser.id, updateUser.username, updateUser.image_path, updateUser.role.type, updateUser.role.id) };
    } else {
      return {success: true, user: new LoggedUser(newUser.id, newUser.username, newUser.image_path, newUser.role.type, newUser.role.id) }
    }
  } catch (error) {
    return { success: false, message: 'Error interno del servidor.' }
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
        image_path: 'users/avatar.png',
        lists: {
          create: {
            name: "Favoritos",
            description: "Lista de favoritos del usuario"
          }
        }
      },
      include: { role: true }
    });
    return new LoggedUser(newUser.id, newUser.username, newUser.image_path, newUser.role.type, newUser.role.id)
  } catch (error) {
    return { success: false, message: 'Error interno del servidor.' }
  }
};

// REGISTRAR USUARIO 
export const createUser = async (username, password, email, birth_date, imageExtension) => {
  const hashedPassword = await bcrypt.hash(password, 10) 
  const newUser = await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
      email: email,
      birth_date: new Date(birth_date),
      image_path: 'users/avatar.png',
      lists: {
        create: {
          name: "Favoritos",
          description: "Lista de favoritos de " + username
        }
      }
    },
    include: { role: true }
  })
  if (newUser) {
    if (imageExtension) {
      const updateUser = await prisma.user.update({
        where: { id: newUser.id },
        data: { image_path: "users/imagenUsuario_" + newUser.id + "_" + new Date().getTime() + "." + imageExtension },
        include: { role: true }
      })
      return new LoggedUser(updateUser.id, updateUser.username, updateUser.image_path, updateUser.role.type, updateUser.role.id)
    } else {
      return new LoggedUser(newUser.id, newUser.username, newUser.image_path, newUser.role.type, newUser.role.id)
    }
  } else {
    return null
  }
}

// EDITAR USUARIO
export const editUser = async (id, username, email, birthDate, imageExtension, imageChange) => {
  
  let image_path = imageExtension ? `users/imagenUsuario_${id}_${new Date().getTime()}.${imageExtension}` : null;
  try {
    const updateData = {
      username: username,
      email: email,
      birth_date: new Date(birthDate)
    };
   
    if (imageChange) {
      updateData.image_path = image_path;
    }
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: updateData,
      include: { role: true }
    })
    return new LoggedUser(updatedUser.id, updatedUser.username, updatedUser.image_path, updatedUser.role.type, updatedUser.role.id)
  } catch (error) {
    return { success: false, message: 'Error interno del servidor.' }
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

// OBTENER USUARIOS POR NOMBRE DE USUARIO
export const findUsersByUsername = async (search) => {
  try {
    const users = await prisma.user.findMany({ where: { username: { contains: search }, roleId: { not: 1 } }, select: { id: true, username: true, image_path: true}, orderBy: { username: 'asc' } });
    return users.map(user => new SearchElement(user.id, user.username, user.image_path, 'Usuario'))
  } catch (error) {
    console.error(`Error obteniendo usuarios por su nombre ${search}: `, error);
    throw error;
  }
};

// OBTENER USUARIO POR NOMBRE DE USUARIO
export const findUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({ where: { username: username } })
  if (user) return new Base(user.id, user.username)
  else return null
};

// OBTENER USUARIO POR EMAIL
export const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({ where: { email: email } })
  if (user) return new Base(user.id, user.email)
  else return null
};

// OBTENER USUARIOS POR ID Y NOMBRE --> EXISTSUSER
export const findUserByIdAndUsername = async (id, username) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: id, username: username }, include: { role: true } });
    return new LoggedUser(user.id, user.username, user.image_path, user.role.type, user.role.id)
  } catch (error) {
    console.error('Error obteniendo usuario por id y nombre: ', error);
    throw error;
  }
};






