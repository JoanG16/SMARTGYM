import { Router } from 'express';

import { 
    getUsuarios,
    getUsuarioId,
     createUsuario,
    deleteUsuario,
    updateUsuario,
    getRoles,
    createRol,
    asignarRol,
    deleteRol
} from '../controllers/usuarios.controller.js';


const router = Router();

 router.get('/usuarios', getUsuarios);

router.get('/usuarios/:name', getUsuarioId);


router.post('/usuarios', createUsuario);

router.patch('/usuarios/:name', updateUsuario);

router.delete('/usuarios/:name', deleteUsuario);

// //roles
router.get('/roles', getRoles);

router.post('/usuarios/roles', createRol);

router.post('/asignar_rol', asignarRol);

router.delete('/eliminar_rol/:name', deleteRol);



export default router;