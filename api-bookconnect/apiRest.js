import express from 'express';
import cors from 'cors';
import bookRoutes from './src/routes/bookRoutes.js';
import authorRoutes from './src/routes/authorRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import fileRoutes from './src/routes/fileRoutes.js';
import genreRoutes from './src/routes/genreRoutes.js';
import roleRoutes from './src/routes/roleRoutes.js';
import listRoutes from './src/routes/listRoutes.js';
import stateRoutes from './src/routes/stateRoutes.js';

const app = express();

app.listen(3000, () =>
  console.log(`
🚀 Servidor funcionando en: http://localhost:3000 ⭐️`),
)  

app.use(cors());

app.use(express.json());

app.use(bookRoutes, authorRoutes, userRoutes, fileRoutes, genreRoutes, roleRoutes, listRoutes,stateRoutes );







