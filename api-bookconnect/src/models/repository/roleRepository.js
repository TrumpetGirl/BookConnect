import Role  from '../model/Role.js'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ------CRUD------
// OBTENER TODOS LOS TIPOS DE ROLES
export const findAllRoles = async () => {
    try {
        const roles = await prisma.role.findMany({
          orderBy:{type:'asc'}
        });
        return roles.map(role => new Role (role.id, role.type));
    } catch (error) {
        console.error('Error al obtener los roles:', error);
        return []; 
    }
  };
  