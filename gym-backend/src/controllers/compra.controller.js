// import { pool } from '../db.js';
// import fs from 'fs';

// // Obtener todos los productos
// export const getProductos = async (req, res) => {
//     try {
//         const [rows] = await pool.query('SELECT * FROM producto');
//         res.json(rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error al obtener los productos');
//     }
// };

// export const getProductosConStockYCategorias = async (req, res) => {
//     try {
//         const [rows] = await pool.query('SELECT * FROM vista_productos_con_stock');
//         res.json(rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error al obtener los productos con stock y categoría');
//     }
// };

// // Obtener stock de un producto
// export const getStock = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const [rows] = await pool.query('SELECT * FROM stock WHERE idproducto = ?', [id]);
//         if (rows.length === 0) {
//             return res.status(404).send('Stock no encontrado');
//         }
//         res.json(rows[0]);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error al obtener el stock');
//     }
// };

// // Obtener todas las compras
// export const getCompras = async (req, res) => {
//     try {
//         const [rows] = await pool.query('SELECT * FROM vista_compras');
//         res.json(rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error al obtener las compras');
//     }
// };

// // Obtener detalles de una compra
// export const getDetalleCompra = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const [rows] = await pool.query('SELECT * FROM detalle_compra WHERE idcompra = ?', [id]);
//         res.json(rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error al obtener el detalle de la compra');
//     }
// };

// // Obtener todas las transacciones
// export const getTransacciones = async (req, res) => {
//     try {
//         const [rows] = await pool.query('SELECT * FROM transaccion');
//         res.json(rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error al obtener las transacciones');
//     }
// };

// // Obtener el estado de la caja
// export const getCaja = async (req, res) => {
//     try {
//         const [rows] = await pool.query('SELECT total FROM caja WHERE idcaja = 1'); // Consulta solo el campo 'total'
//         res.json(rows[0]); // Devuelve el primer resultado encontrado (debería ser único por idcaja)
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error al obtener el estado de la caja');
//     }
// };

// // Crear una nueva compra
// export const realizarCompra = async (req, res) => {
//     const { descripcion, total, detalles } = req.body;
//     try {
//         const [result] = await pool.query(
//             'CALL realizar_compra(?, ?, ?)',
//             [descripcion, total, JSON.stringify(detalles)]
//         );
//         res.json(result);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error al realizar la compra');
//     }
// };

// // Obtener detalles de una compra por ID
// export const getCompraById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const [result] = await pool.query(
//             'SELECT * FROM vista_compras_detalles WHERE idcompra = ?',
//             [id]
//         );
//         res.json(result);
//     } catch (error) {
//         console.error('Error al obtener los detalles de la compra:', error);
//         res.status(500).send('Error al obtener los detalles de la compra');
//     }
// };


// export const guardarProducto = async (req, res) => {
//     const { idproducto, nombre, descripcion, precio, costo, idcategoria } = req.body;
//     try {
//         const [result] = await pool.query(
//             'CALL sp_guardar_producto(?, ?, ?, ?, ?, ?)',
//             [idproducto, nombre, descripcion, precio, costo, idcategoria]
//         );
//         res.json(result[0]);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error al guardar el producto');
//     }
// };

// export const getCategoriasProductos = async (req, res) => {
//     try {
//         const [rows] = await pool.query('SELECT * FROM categoria_productos');
//         res.json(rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error al obtener las categorías de productos');
//     }
// };

// // Eliminar un producto y su stock asociado
// export const eliminarProducto = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const [rows] = await pool.query('CALL sp_eliminar_producto(?)', [id]);
//         console.log('Resultado de la eliminación:', rows); // Añade este log para verificar la respuesta
//         const message = rows[0] ? rows[0].message : 'Producto eliminado correctamente';
//         res.status(200).send(message);
//     } catch (error) {
//         console.error('Error en eliminarProducto:', error); // Mejora el mensaje de log
//         res.status(500).send('Error al eliminar el producto');
//     }
// };



import { getConnection, sql } from '../db.js';
import fs from 'fs';

// Obtener todos los productos
export const getProductos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM producto');
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
    }
};

export const getProductosConStockYCategorias = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM vista_productos_con_stock');
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos con stock y categoría');
    }
};

// Obtener stock de un producto
export const getStock = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request().input('id', sql.Int, id).query('SELECT * FROM stock WHERE idproducto = @id');
        if (result.recordset.length === 0) {
            return res.status(404).send('Stock no encontrado');
        }
        res.json(result.recordset[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el stock');
    }
};

// Obtener todas las compras
export const getCompras = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM vista_compras');
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las compras');
    }
};

// Obtener detalles de una compra
export const getDetalleCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request().input('id', sql.Int, id).query('SELECT * FROM detalle_compra WHERE idcompra = @id');
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el detalle de la compra');
    }
};

// Obtener todas las transacciones
export const getTransacciones = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM transaccion');
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las transacciones');
    }
};

// Obtener el estado de la caja
export const getCaja = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT total FROM caja WHERE idcaja = 1');
        res.json(result.recordset[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el estado de la caja');
    }
};

// Crear una nueva compra
export const realizarCompra = async (req, res) => {
    const { descripcion, total, detalles } = req.body;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('descripcion', sql.VarChar, descripcion)
            .input('total', sql.Decimal(10, 2), total)
            .input('detalles', sql.NVarChar, JSON.stringify(detalles))
            .execute('realizar_compra');
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al realizar la compra');
    }
};

// Obtener detalles de una compra por ID
export const getCompraById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request().input('id', sql.Int, id).query('SELECT * FROM vista_compras_detalles WHERE idcompra = @id');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los detalles de la compra:', error);
        res.status(500).send('Error al obtener los detalles de la compra');
    }
};

export const guardarProducto = async (req, res) => {
    const { idproducto, nombre, descripcion, precio, costo, idcategoria } = req.body;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('idproducto', sql.Int, idproducto)
            .input('nombre', sql.VarChar, nombre)
            .input('descripcion', sql.Text, descripcion)
            .input('precio', sql.Decimal(10, 2), precio)
            .input('costo', sql.Decimal(10, 2), costo)
            .input('idcategoria', sql.Int, idcategoria)
            .execute('sp_guardar_producto');
        res.json(result.recordset[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el producto');
    }
};

export const getCategoriasProductos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM categoria_productos');
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las categorías de productos');
    }
};

// Eliminar un producto y su stock asociado
export const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request().input('id', sql.Int, id).execute('sp_eliminar_producto');
        console.log('Resultado de la eliminación:', result.recordset); // Añade este log para verificar la respuesta
        const message = result.recordset[0] ? result.recordset[0].message : 'Producto eliminado correctamente';
        res.status(200).send(message);
    } catch (error) {
        console.error('Error en eliminarProducto:', error); // Mejora el mensaje de log
        res.status(500).send('Error al eliminar el producto');
    }
};

