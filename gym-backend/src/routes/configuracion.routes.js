import { Router } from 'express';
import { respaldarBaseDatos, restoreDatabase } from '../controllers/configuracion.controller.js';
import multipart from 'connect-multiparty';

const multiPartMiddleware = multipart({
  uploadDir: './src/subidos'
});

const router = Router();

router.post('/respaldar', respaldarBaseDatos);
router.post('/restore-database', multiPartMiddleware, restoreDatabase);

export default router;
