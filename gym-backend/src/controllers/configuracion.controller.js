
// import mysqldump from 'mysqldump';
// import { exec } from 'child_process';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import { getConnection, sql } from '../db.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export const respaldarBaseDatos = async (req, res) => {
//   try {
//     const pool = await getConnection();

//     const now = new Date();
//     const formattedDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_T${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;

//     const nombreArchivo = `gym-respaldo_${formattedDateTime}.sql`;

//     const rutaRespaldo = `./src/respaldos/${nombreArchivo}`;

//     const command = `mysqldump -u root -padmin --databases gymdb > ${rutaRespaldo} 2> NUL || true`;

//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         console.error(`Error al respaldar la base de datos: ${error.message}`);
//         return res.status(500).json({ error: 'Error al respaldar la base de datos' });
//       }
  
//       if (stderr) {
//         console.error(`Error al respaldar la base de datos: ${stderr}`);
//         return res.status(500).json({ error: 'Error al respaldar la base de datos' });
//       }
  
//       console.log('La base de datos ha sido respaldada correctamente');
//       res.status(200).json({
//         message: 'Base de datos respaldada correctamente'
//         //PONER TAMBIEN EL NOMBRE DEL ARCHIVO CON EL QUE SE GUARDÓ
//       });
//     });
//   } catch (error) {
//     console.error('Error al respaldar la base de datos:', error);
//     res.status(500).send('Error al respaldar la base de datos');
//   }
// };


// // FUNCION PARA RESTAURAR LA BASE DE DATOS
// export const restoreDatabase = async (req, res) => {
//   try {
//     const pool = await getConnection();

//     // Comando SQL para crear la base de datos (si no existe)
//     const createDatabaseCommand = 'mysql -u root -padmin -e "CREATE DATABASE IF NOT EXISTS gymdb"';
//     exec(createDatabaseCommand, (error, stdout, stderr) => {
//       if (error) {
//         console.error(`Error al crear la base de datos: ${error.message}`);
//         return res.status(500).json({ error: 'Error al crear la base de datos' });
//       }
//       console.log('Base de datos creada correctamente o ya existente');

//       // Obteniendo el nombre del archivo subido
//       const uploadedFile = req.files.uploads[0];
//       const originalFileName = uploadedFile.originalFilename;
//       const serverFileName = path.basename(uploadedFile.path);

//       const rutaRespaldo = `./src/subidos/${serverFileName}`;

//       const command = `mysql -u root -padmin gymdb < ${rutaRespaldo} 2> NUL || true`;

//       exec(command, (error, stdout, stderr) => {
//         if (error) {
//           console.error(`Error al restaurar la base de datos: ${error.message}`);
//           return res.status(500).json({ error: 'Error al restaurar la base de datos' });
//         }
    
//         if (stderr) {
//           console.error(`Error al restaurar la base de datos: ${stderr}`);
//           return res.status(500).json({ error: 'Error al restaurar la base de datos' });
//         }
    
//         console.log('La base de datos ha sido restaurada correctamente');
//         res.status(200).json({
//           message: 'Base de datos restaurada correctamente',
//           originalFileName: originalFileName,
//           serverFileName: serverFileName,
//           rutaRespaldo: rutaRespaldo
//         });
//       });
//     });
//   } catch (error) {
//     console.error('Error al restaurar la base de datos:', error);
//     res.status(500).send('Error al restaurar la base de datos');
//   }
// };

import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'; // Añadir esta línea
import { getConnection, sql } from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const respaldarBaseDatos = async (req, res) => {
  try {
    const pool = await getConnection();

    const now = new Date();
    const formattedDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_T${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;

    const nombreArchivo = `gym-respaldo_${formattedDateTime}.bak`;

    const rutaRespaldo = path.join(__dirname, 'respaldos', nombreArchivo);

    // Agregar este console.log para verificar la ruta
    console.log('Ruta de respaldo:', rutaRespaldo);

    // Verificar si el directorio de respaldo existe, si no, crearlo
    if (!fs.existsSync(path.join(__dirname, 'respaldos'))) {
      fs.mkdirSync(path.join(__dirname, 'respaldos'));
    }

    const config = {
        user: 'mijo', // tu usuario de SQL Server
        password: '123456', // tu contraseña de SQL Server
        server: 'localhost', // la dirección de tu servidor
        database: 'gimnasio', // el nombre de tu base de datos
    };

    const command = `sqlcmd -S ${config.server} -U ${config.user} -P ${config.password} -Q "BACKUP DATABASE ${config.database} TO DISK='${rutaRespaldo}' WITH FORMAT"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al respaldar la base de datos: ${error.message}`);
        return res.status(500).json({ error: 'Error al respaldar la base de datos' });
      }
  
      if (stderr) {
        console.error(`Error al respaldar la base de datos: ${stderr}`);
        return res.status(500).json({ error: 'Error al respaldar la base de datos' });
      }
  
      console.log('La base de datos ha sido respaldada correctamente');
      res.status(200).json({
        message: 'Base de datos respaldada correctamente',
        nombreArchivo: nombreArchivo,
        rutaRespaldo: rutaRespaldo
      });
    });
  } catch (error) {
    console.error('Error al respaldar la base de datos:', error);
    res.status(500).send('Error al respaldar la base de datos');
  }
};


// Función para restaurar la base de datos
export const restoreDatabase = async (req, res) => {
  try {
    const pool = await getConnection();

    // Obtener el archivo subido
    const uploadedFile = req.files.uploads[0];
    const originalFileName = uploadedFile.originalFilename;
    const serverFileName = path.basename(uploadedFile.path);
    const rutaSubidos = path.join(__dirname, 'subidos');

    // Verificar si el directorio de subidos existe, si no, crearlo
    if (!fs.existsSync(rutaSubidos)) {
      fs.mkdirSync(rutaSubidos);
    }

    const rutaRespaldo = path.join(rutaSubidos, serverFileName);

    // Mover el archivo subido a la carpeta "subidos"
    fs.renameSync(uploadedFile.path, rutaRespaldo);

    const config = {
      user: 'mijo',
      password: '123456',
      server: 'localhost',
      database: 'gimnasio',
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    };

    const command = `sqlcmd -S ${config.server} -U ${config.user} -P ${config.password} -Q "RESTORE DATABASE ${config.database} FROM DISK='${rutaRespaldo}' WITH REPLACE"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al restaurar la base de datos: ${error.message}`);
        return res.status(500).json({ error: 'Error al restaurar la base de datos' });
      }

      if (stderr) {
        console.error(`Error al restaurar la base de datos: ${stderr}`);
        return res.status(500).json({ error: 'Error al restaurar la base de datos' });
      }

      console.log('La base de datos ha sido restaurada correctamente');
      res.status(200).json({
        message: 'Base de datos restaurada correctamente',
        originalFileName: originalFileName,
        serverFileName: serverFileName,
        rutaRespaldo: rutaRespaldo
      });
    });
  } catch (error) {
    console.error('Error al restaurar la base de datos:', error);
    res.status(500).send('Error al restaurar la base de datos');
  }
};