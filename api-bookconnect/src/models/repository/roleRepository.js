import Role  from '../model/Role.js'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ------CRUD------
// OBTENER TODOS LOS TIPOS DE ROLES
export const findAllRolesSelector = async () => {
    try {
        const roles = await prisma.role.findMany({
          select: {
            id: true,
            description: true
          },
          orderBy:[
            {description:'asc'}
          ]
        });
        return roles.map(role => new Base (role.id, role.description));
    } catch (error) {
        console.error('Error al obtener los nombres de los géneros:', error);
        return []; 
    }
  };
  