// Importamos el modelo de usuario y el objeto de PrismaClient para utilizar sus métodos
import User  from '../model/User.js'
import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// Creamos el objeto de Prisma
const prisma = new PrismaClient();

const secretKey = 'your-secret-key';

export const login = async (username, password) => {
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return { success: false, message: 'Invalid username or password' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: 'Invalid username or password' };
    }

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
    return { success: true, token };
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
    const arrUsers = users.map(user => new User(user.id, user.name, user.password, 
      user.birthday_date, user.role));

    return arrUsers;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return []; // Devuelve un array vacío en caso de error
  }
};