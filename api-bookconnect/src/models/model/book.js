import { DataTypes, Sequelize } from 'sequelize';
import sequelize from './sequelize'; // Archivo de configuración de Sequelize

const Book = sequelize.define('Book', {
  // Definición de los campos de la tabla de libros
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
  },
  year: {
    type: DataTypes.INTEGER,
  },
});

// Sincronizar el modelo con la base de datos (crear la tabla si no existe)
Book.sync();

export default Book;
