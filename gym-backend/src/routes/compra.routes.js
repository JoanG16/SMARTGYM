import { Router } from 'express';
import { 
    getProductos, 
    getStock, 
    getCompras, 
    getDetalleCompra, 
    getTransacciones, 
    getCaja, 
    realizarCompra ,
    getCompraById,
    getProductosConStockYCategorias,
    guardarProducto,
    getCategoriasProductos,
    eliminarProducto
} from '../controllers/compra.controller.js';

const router = Router();

router.get('/allproductos', getProductos);
router.get('/stock/:id', getStock);
router.get('/compras', getCompras);
router.get('/compras/:id/detalles', getDetalleCompra);
router.get('/transacciones', getTransacciones);
router.get('/caja', getCaja);
router.post('/compras', realizarCompra);
router.get('/compras/:id', getCompraById);
router.get('/productos', getProductosConStockYCategorias);
router.post('/productos/guardar', guardarProducto);
router.get('/categorias', getCategoriasProductos);
router.delete('/productos/:id', eliminarProducto);


export default router;
