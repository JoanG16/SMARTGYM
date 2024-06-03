// import { getConnection } from '../db.js';

// export const getMiembros = async (req, res) => {
//     const pool = await getConnection();
//     const [rows] = await pool.request().query('SELECT * FROM miembros')
//     return res.json(rows)
// }


// // export const getMiembroId = async (req, res) => {
// //     console.log(req.params.id)
// //     const [rows] = await pool.query('SELECT * FROM miembros WHERE idmiembro = ?', [req.params.id])

// //     if (rows.length <= 0) return res.status(404).json({
// //         message: 'Miembro no encontrado'
// //     })
// //     return res.json(rows[0])
// // }

// // export const createMiembro = async (req, res) => {
// //     const {
// //         matricula,
// //         nombre,
// //         telefono,
// //         direccion,
// //         edad,
// //         sufreEnfermedad,
// //         tieneSeguro,
// //         enfermedad,
// //         institucion,
// //         nombreContacto,
// //         telefonoContacto,
// //         imagen
// //     } = req.body

// //     const [rows] = await pool.query('INSERT INTO miembros (matricula, nombre, telefono, direccion, edad, sufreEnfermedad, tieneSeguro, enfermedad, institucion, nombreContacto, telefonoContacto, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
// //         [matricula, nombre, telefono, direccion, edad, sufreEnfermedad, tieneSeguro, enfermedad, institucion, nombreContacto, telefonoContacto, imagen])
// //     res.send({
// //         id: rows.insertId,
// //         matricula,
// //         nombre,
// //         telefono,
// //         direccion,
// //         edad,
// //         sufreEnfermedad,
// //         tieneSeguro,
// //         enfermedad,
// //         institucion,
// //         nombreContacto,
// //         telefonoContacto,
// //         imagen
// //     })
// // }


// // export const deleteMiembro = async (req, res) => {
// //     const [result] = await pool.query('DELETE FROM miembros WHERE idmiembro = ?', [req.params.id])

// //     if (result.affectedRows <= 0) return res.status(404).json({
// //         message: 'Miembro no encontrado'
// //     })
// //     res.sendStatus(204)
// // }

// // export const updateMiembro = async (req, res) => {
// //     const {id} = req.params
// //     const {
// //         matricula,
// //         nombre,
// //         telefono,
// //         direccion,
// //         edad,
// //         sufreEnfermedad,
// //         tieneSeguro,
// //         enfermedad,
// //         institucion,
// //         nombreContacto,
// //         telefonoContacto,
// //         imagen
// //     } = req.body

// //     const [result] = await pool.query('UPDATE miembros SET matricula = IFNULL(?, matricula),  nombre = IFNULL(?, nombre), telefono = IFNULL(?, telefono), direccion = IFNULL(?, direccion), edad = IFNULL(?, edad), sufreEnfermedad = IFNULL(?, sufreEnfermedad), tieneSeguro = IFNULL(?, tieneSeguro), enfermedad = IFNULL(?, enfermedad), institucion = IFNULL(?, institucion), nombreContacto = IFNULL(?, nombreContacto), telefonoContacto = IFNULL(?, telefonoContacto), imagen = IFNULL(?, imagen) WHERE idmiembro = ?', 
// //     [matricula, nombre, telefono, direccion, edad, sufreEnfermedad, tieneSeguro, enfermedad, institucion, nombreContacto, telefonoContacto, imagen, id])

// //     if (result.affectedRows === 0) return res.status(404).json({
// //         message: 'Miembro no encontrado'
// //     })


// //     const [rows] = await pool.query('SELECT * FROM miembros WHERE idmiembro = ?', [id])

// //     res.json(rows[0])

// // }