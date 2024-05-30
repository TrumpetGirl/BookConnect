import Base  from '../model/Role.js'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ------CRUD------
// OBTENER TODOS LOS TIPOS DE ROLES
export const findAllRolesSelector = async () => {
    try {
        const roles = await prisma.role.findMany({
          orderBy:{type:'asc'}
        });
        return roles.map(role => new Base (role.id, role.type));
    } catch (error) {
        console.error('Error al obtener los tipos de roles:', error);
        return []; 
    }
  };
  