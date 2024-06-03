import { Router } from 'express';

import { 
    getEntidades,
    getEntidadAtributos,
    crearEntidad,
    generarProcedimientosParaTodas,
    getRegistrosEntidad 
} from '../controllers/entidades.controller.js';

const router = Router();

router.get('/entidades', getEntidades);

router.get('/entidades/:table_name', getEntidadAtributos);

router.post('/agregar_entidad', crearEntidad); // Nueva ruta para crear la entidad


router.get('/generar-procedimientos-todas', generarProcedimientosParaTodas);

router.get('/registros_entidad/:entidad', getRegistrosEntidad); 

export default router;