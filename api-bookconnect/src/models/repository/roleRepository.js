import Role  from '../model/Role.js'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ------CRUD------
// OBTENER TODOS LOS ROLES
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

  // OBTENER ROL POR ID
export const findRoleById = async (id) => {
  try {
    return await prisma.role.findUnique({ where: { id: id } })
  } catch (error) {
    console.error(`Error obteniendo el rol ${id}: `, error)
    throw error;
  }
};

// CREAR ROL
export async function addRole(type) {
  try {
    const newRole = await prisma.role.create({ data: { type: type}});
      return newRole
    } catch (error) {
    console.error('Error añadiendo rol: ', error);
    throw error;
  }
};

// EDITAR ROL
export const editRole = async (id, type) => {
  try {
    const updateData = {type: type};
    const updatedRole = await prisma.role.update({
      where: { id: id },
      data: updateData
    });
    return updatedRole;
  } catch (error) {
    console.error('Error editando el rol: ', error);
    throw error;
  }
};

// ELIMINAR ROL
export const deleteRole = async (id) => {
  try {
    return await prisma.role.delete({ where: { id: id } });
  } catch (error) {
    console.error(`Error eliminando el rol ${id}: `, error);
    throw error;
  }
};
// ------ END CRUD ------
  