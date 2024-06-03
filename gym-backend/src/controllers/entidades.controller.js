
// import fs from 'fs';
// import { getConnection, sql } from '../db.js';

// export const getEntidades = async (req, res) => {
//     try {
//         const pool = await getConnection();
//         const result = await pool.request()
//             .query("SELECT DISTINCT table_name FROM information_schema.columns WHERE table_catalog = 'gimnasio'");

//         return res.json(result.recordset);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send("Error al obtener las entidades");
//     }
// }

// export const getEntidadAtributos = async (req, res) => {
//     console.log(req.params.table_name)
//     const { table_name } = req.params; 
//     const [rows] = await pool.query("SELECT * FROM information_schema.columns WHERE table_schema = 'gymdb' AND table_name = ?", table_name)

//     return res.json(rows)
// }

// export const crearEntidad = async (req, res) => {

//     const { nombre, atributos } = req.body;
    
//     try {
//         await pool.query(`CREATE TABLE ${nombre} (${atributos.map(({ nombre, tipo, primaryKey }) => `${nombre} ${tipo} ${primaryKey === 'YES' ? 'PRIMARY KEY' : ''}`).join(', ')});`);

//         return res.status(200).json({ message: 'Tabla creada exitosamente' });
//     } catch (error) {
//         console.error('Error al crear la tabla:', error);
//         return res.status(500).json({ error: 'Error al crear la tabla' });
//     }
// }


// export const generarProcedimientosParaTodas = async (req, res) => {

//     try {
//         const [tables] = await pool.query("SELECT DISTINCT TABLE_NAME FROM information_schema.columns WHERE table_schema = 'gymdb'");
        
//         // Variable para almacenar todos los procedimientos generados
//         let proceduresSQL = 'USE gymdb;\n\n';

//         for (const table of tables) {
//             const tableName = table.TABLE_NAME;
//             const [columns] = await pool.query("SELECT * FROM information_schema.columns WHERE table_schema = 'gymdb' AND table_name = ?", [tableName]);

//             const primaryKeyColumn = columns.find(column => column.COLUMN_KEY === 'PRI');

//             // Verifica si primaryKeyColumn es undefined antes de acceder a sus propiedades
//             if (primaryKeyColumn) {
//                 const primaryKey = primaryKeyColumn.COLUMN_NAME;
//                 const insertColumns = columns.map(column => column.COLUMN_NAME).join(', ');
//                 const insertValues = columns.map(() => '?').join(', ');
//                 const updateSet = columns.filter(column => column.COLUMN_NAME !== primaryKey).map(column => `${column.COLUMN_NAME} = ?`).join(', ');

//                 const tableProcedures = `
// -- PROCEDIMIENTOS ALMACENADOS PARA ${tableName}

// DELIMITER //
// CREATE OR REPLACE PROCEDURE insert_${tableName}(${columns.map(column => `IN p_${column.COLUMN_NAME} ${column.DATA_TYPE}`).join(', ')})
// BEGIN
//     INSERT INTO ${tableName} (${insertColumns}) VALUES (${insertValues});
// END //

// CREATE OR REPLACE PROCEDURE update_${tableName}(IN p_${primaryKey} ${primaryKeyColumn.DATA_TYPE}, ${columns.map(column => `IN p_${column.COLUMN_NAME} ${column.DATA_TYPE}`).join(', ')})
// BEGIN
//     UPDATE ${tableName} SET ${updateSet} WHERE ${primaryKey} = p_${primaryKey};
// END //

// CREATE OR REPLACE PROCEDURE delete_${tableName}(IN p_${primaryKey} ${primaryKeyColumn.DATA_TYPE})
// BEGIN
//     DELETE FROM ${tableName} WHERE ${primaryKey} = p_${primaryKey};
// END //
// DELIMITER ;

                    
// `;

//                 proceduresSQL += tableProcedures + '\n\n';
//                 console.log('Procedimientos generados para la tabla:', tableName);
//             }
//         }

//         // Guarda los procedimientos en un archivo .sql
//         const filePath = 'C:\\procedimientosSQL\\archivo.sql';
//         fs.writeFileSync(filePath, proceduresSQL);

//         // Envía el archivo como respuesta al cliente para descargar
//         res.download(filePath, 'procedimientos.sql');

//         //console.log('Contenido de proceduresSQL:', proceduresSQL);
//     } catch (error) {
//         console.error('Error al generar los procedimientos almacenados:', error);
//         res.status(500).json({ error: 'Error al generar los procedimientos almacenados' });
//     }
// };







import fs from 'fs';
import { getConnection, sql } from '../db.js';

export const getEntidades = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .query("SELECT DISTINCT table_name FROM information_schema.columns WHERE table_catalog = 'gimnasio'");

        return res.json(result.recordset);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al obtener las entidades");
    }
}

export const getEntidadAtributos = async (req, res) => {
    const { table_name } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('tableName', sql.NVarChar, table_name)
            .query("SELECT * FROM information_schema.columns WHERE table_catalog = 'gimnasio' AND table_name = @tableName");

        return res.json(result.recordset);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al obtener los atributos de la entidad");
    }
}

export const crearEntidad = async (req, res) => {
    const { nombre, atributos } = req.body;

    try {
        const pool = await getConnection();
        const createTableQuery = `
            CREATE TABLE ${nombre} (
                ${atributos.map(({ nombre, tipo, primaryKey }) => `${nombre} ${tipo} ${primaryKey === 'YES' ? 'PRIMARY KEY' : ''}`).join(', ')}
            );
        `;

        await pool.request().query(createTableQuery);

        return res.status(200).json({ message: 'Tabla creada exitosamente' });
    } catch (error) {
        console.error('Error al crear la tabla:', error);
        return res.status(500).json({ error: 'Error al crear la tabla' });
    }
}
export const generarProcedimientosParaTodas = async (req, res) => {
    try {
        const pool = await getConnection();
        const tablesResult = await pool.request()
            .query("SELECT DISTINCT table_name FROM information_schema.columns WHERE table_catalog = 'gimnasio'");

        const tables = tablesResult.recordset;

        if (tables.length === 0) {
            throw new Error('No se encontraron tablas en la base de datos.');
        }

        let proceduresSQL = 'USE gimnasio;\n\n';

        for (const table of tables) {
            const tableName = table.table_name;
            const columnsResult = await pool.request()
                .input('tableName', sql.NVarChar, tableName)
                .query("SELECT * FROM information_schema.columns WHERE table_catalog = 'gimnasio' AND table_name = @tableName");

            const columns = columnsResult.recordset;
            const primaryKeyColumn = columns.find(column => column.column_key === 'PRI');

            if (primaryKeyColumn) {
                const primaryKey = primaryKeyColumn.column_name;
                const insertColumns = columns.map(column => column.column_name).join(', ');
                const insertValues = columns.map(() => '@' + column.column_name).join(', ');
                const updateSet = columns.filter(column => column.column_name !== primaryKey).map(column => `${column.column_name} = @${column.column_name}`).join(', ');

                const tableProcedures = `
-- PROCEDIMIENTOS ALMACENADOS PARA ${tableName}

CREATE OR ALTER PROCEDURE insert_${tableName} (${columns.map(column => `@${column.column_name} ${column.data_type}`).join(', ')})
AS
BEGIN
    INSERT INTO ${tableName} (${insertColumns}) VALUES (${insertValues});
END;

CREATE OR ALTER PROCEDURE update_${tableName} (@${primaryKey} ${primaryKeyColumn.data_type}, ${columns.map(column => `@${column.column_name} ${column.data_type}`).join(', ')})
AS
BEGIN
    UPDATE ${tableName} SET ${updateSet} WHERE ${primaryKey} = @${primaryKey};
END;

CREATE OR ALTER PROCEDURE delete_${tableName} (@${primaryKey} ${primaryKeyColumn.data_type})
AS
BEGIN
    DELETE FROM ${tableName} WHERE ${primaryKey} = @${primaryKey};
END;
`;

                proceduresSQL += tableProcedures + '\n\n';
                console.log('Procedimientos generados para la tabla:', tableName);
            }
        }

        const filePath = 'C:\\procedimientosSQL\\archivo.sql';
        fs.writeFileSync(filePath, proceduresSQL);

        res.download(filePath, 'procedimientos.sql');
        console.log('Resultado de la consulta de tablas:', tablesResult.recordset);
    } catch (error) {
        console.error('Error al generar los procedimientos almacenados:', error);
        res.status(500).json({ error: 'Error al generar los procedimientos almacenados' });
    }
};




export const getRegistrosEntidad = async (req, res) => {
    const pool = await getConnection();
    const entidad = req.params.entidad;
    
    // Asegúrate de sanitizar el nombre de la tabla
    if (!/^[a-zA-Z0-9_]+$/.test(entidad)) {
        return res.status(400).json({ error: 'Invalid table name' });
    }
    
    try {
        const result = await pool.request().query(`SELECT * FROM [${entidad}]`);
        return res.json(result.recordset);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

 

  };
