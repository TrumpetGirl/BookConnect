// Importamos Express.js, cors y las rutas de libro
import express from 'express';
import cors from 'cors';
import bookRoutes from './src/routes/bookRoutes.js';
import authorRoutes from './src/routes/authorRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import fileRoutes from './src/routes/fileRoutes.js';

// Creamos la API
const app = express();

// Configruamos el puerto del servidor
app.listen(3000, () =>
  console.log(`
🚀 Servidor funcionando en: http://localhost:3000 ⭐️`),
)  

// Middleware para permitir CORS
app.use(cors());

// Middleware para analizar el cuerpo de las solicitudes entrantes
app.use(express.json());


// Utilizamos las diferentes rutas dentro de la API
app.use(bookRoutes, authorRoutes, userRoutes, fileRoutes);







