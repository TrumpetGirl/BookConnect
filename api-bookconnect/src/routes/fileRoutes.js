import express from 'express'
import multer from 'multer'
import fs from 'node:fs'

const router = express.Router();

const upload = multer({dest: 'src/assets/images/'})

router.post('/file/upload', upload.single('file'), (req, res) => {
    fs.renameSync(req.file.path, req.file.destination + req.body.path )
});

router.use('/file/download', express.static('src/assets/images'), (req, res) => {});

export default router;
