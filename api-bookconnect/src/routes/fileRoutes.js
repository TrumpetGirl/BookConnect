// Importamos Express.js y el controlador para utilizar sus métodos
import express from 'express'
import multer from 'multer'
import fs from 'node:fs'

// Creamos el enrutador de Express
const router = express.Router();

const upload = multer({dest: 'src/assets/images/'})
// Configuramos la ruta POST /authors para añadir un nuevo autor
router.post('/file/upload', upload.single('file'), (req, res) => {
    fs.renameSync(req.file.path, req.file.destination + req.body.path )
    res.send('Terminado')
});

router.use('/file/download', express.static('src/assets/images'), (req, res) => {
    res.send('Terminado')
});

// Exportamos el enrutador
export default router;
