import express from 'express';
import cors from 'cors';

import bookRoutes from './src/routes/bookRoutes.js';


const app = express();

app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/js/rest-express#3-using-the-rest-api`),
)  

// Middleware para permitir CORS
app.use(cors());

// Middleware para analizar el cuerpo de las solicitudes entrantes
app.use(express.json());
app.use(bookRoutes)

// app.get('/book/:authorId', getAuthorBooks);





