import express from 'express'
import multer from 'multer'
import fs from 'node:fs'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router();

const upload = multer({dest: 'src/assets/images/'})

router.post('/file/upload', verifyToken, upload.single('file'), (req, res, next) => {
    try {
        fs.renameSync(req.file.path, req.file.destination + req.body.path )
        res.status(200).json({ message: "Archivo guardado." });
    } catch (error) {
        next(error)
    }
})

router.use('/file/download', express.static('src/assets/images'), verifyToken, (req, res) => {});

router.delete('/file/delete/:path([\\w\\W]+)', verifyToken, (req, res) => {
    try {
        fs.unlinkSync('src/assets/images/' + req.params.path);
        res.status(200).json({ message: "Archivo borrado." });
    } catch (error) {
        next(error)
    }
});

export default router;
