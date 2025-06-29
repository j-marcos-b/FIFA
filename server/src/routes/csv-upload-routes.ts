import { Router } from 'express';
import multer from 'multer';
import { uploadCsv } from '../controllers/csv-upload-controller';

const router = Router();

const upload = multer({
  dest: 'uploads/', // Carpeta temporal para archivos subidos
  limits: { fileSize: 100 * 1024 * 1024 } // Limite de 100MB
});

router.post('/upload-csv', upload.single('file'), uploadCsv);

export default router;
