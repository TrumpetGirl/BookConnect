// Importamos el modelo de usuario y el objeto de PrismaClient para utilizar sus métodos
import User  from '../model/User.js'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Creamos el objeto de Prisma
const prisma = new PrismaClient();

export const findUserById = async (id) => {
  try {
    return await prisma.user.findUnique({ where: { id: id } });
  } catch (error) {
    console.error('Error getting user by id:', error);
    throw error;
  }
};

export const findUserByIdAndUsername = async (id, username) => {
  try {
    return await prisma.user.findUnique({ where: { id: id, username: username }, select: {id: true, username: true} });
  } catch (error) {
    console.error('Error getting by id and username:', error);
    throw error;
  }
};

export const registerUser = async (username, password, email, birthDate) => {
  try {
     // Ciframos la contraseña usando bcrypt
     const hashedPassword = await bcrypt.hash(password, 10); // 10 es el costo del cifrado
    
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        email: email,
        birth_date: new Date(birthDate), // Convertir la cadena a tipo DateTime
        role: 2
      }

    });
    const excludeKeys = ['password','birth_date','role','email']
    return Object.fromEntries(
      Object.entries(newUser).filter(([key]) => !excludeKeys.includes(key))
    );
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};




const secretKey = 'your-secret-key';

export const login = async (username, password) => {
  try {
    const user = await prisma.user.findUnique({ where: { username: username } });
    if (!user) {
      return { success: false, message: 'Invalid username' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: 'Invalid password' };
    }

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
    return { success: true, user: user, token: token };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Internal server error' };
  }
};

// Función asíncrona que devuelve todos los usuarios en función de su rol de la base de datos
export const findUsersByRole = async () => {
  try {
    // Utilizamos el método findMany de Prisma para obtener todos los usuarios
    const users = await prisma.book.findMany({
        // Filtro de rol
        where: {
          role: Number(roleId)
        }
      });
    
    // Mapea los libros de Prisma al modelo de usuario
    const arrUsers = users.map(user => new User(user.id, user.username, user.password, 
      user.birthday_date, user.role));

    return arrUsers;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return []; // Devuelve un array vacío en caso de error
  }
};